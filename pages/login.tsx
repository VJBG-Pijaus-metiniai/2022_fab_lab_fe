import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Box, Button, Text } from "@chakra-ui/react";
import { SectionWrapper } from "components/wrappers/SectionWrapper";
import { Formik } from "formik";
import { FormInput } from "components/items/Input";
import { GetCurrentUser, LoginFunc } from "api";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    GetCurrentUser().then((user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  return (
    <SectionWrapper>
      <LoginWrapper>
        <Text color="gray.500" fontWeight={700} mb={2} fontSize="1.25rem">
          Login
        </Text>
        <CardWrapper>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={({ email, password }) => {
              const errors: any = {};

              if (!email) {
                errors.email = "Required!";
              } else if (!password) {
                errors.password = "Required!";
              }

              if (
                !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
              ) {
                errors.email = "Invalid email address!";
              }

              return errors;
            }}
            onSubmit={async ({ email, password }) => {
              try {
                await LoginFunc(email, password);
                router.push("/");
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              /* and other goodies */
            }) => (
              <Box maxW={350}>
                <form onSubmit={handleSubmit}>
                  <FormInput
                    name="email"
                    placeHolder="Enter an email address"
                    title="Email"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    onChange={handleChange}
                  />
                  <FormInput
                    name="password"
                    placeHolder="Enter an password address"
                    title="Password"
                    type="password"
                    value={values.password}
                    error={errors.password}
                    onChange={handleChange}
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mt={4}
                  >
                    <Button w="40" colorScheme="blue" type="submit">
                      Log in
                    </Button>
                  </Box>
                  <Button mt={3} color="blue.500">
                    <Link href="/register">Register</Link>
                  </Button>
                </form>
              </Box>
            )}
          </Formik>
        </CardWrapper>
      </LoginWrapper>
    </SectionWrapper>
  );
};

const CardWrapper = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 0.5rem 1.5rem 1.5rem;
  border-radius: 2rem;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 6.5rem);
`;

export default Login;
