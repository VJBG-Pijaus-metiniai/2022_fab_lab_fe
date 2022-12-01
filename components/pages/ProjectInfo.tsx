import React, { useEffect } from "react";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { useRecoilState } from "recoil";
import { Formik } from "formik";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { SectionWrapper } from "components/wrappers/SectionWrapper";
import { createState } from "state";

import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

interface Props {
  onNext: () => void;
}

export const ProjectInfo: React.FC<Props> = ({ onNext }) => {
  const [projectInfo, setProjectInfo] = useRecoilState(createState);

  return (
    <SectionWrapper>
      <Flex
        my={8}
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Text fontWeight={500} fontSize="1.5rem">
          Give some info about the project
        </Text>
        <Formik
          initialValues={{ title: "", description: "", supervisor: "" }}
          validate={({ title, description, supervisor }) => {
            const errors: any = {};
            console.log(title, description, supervisor)

            if (!title) {
              errors.title = "Required!";
            } else if (!projectInfo.description) {
              errors.description = "Required!";
            } else if (!supervisor) {
              errors.supervisor = "Required!";
            }

            return errors;
          }}
          onSubmit={({ title, supervisor }) => {
            setProjectInfo({ ...projectInfo, title, supervisor });
            onNext();
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box minW="md" mt={5} borderRadius="xl" boxShadow="xl" p={4}>
                <Flex gap={3}>
                  <Flex width="100%" direction="column" justifyContent="flex-start">
                    <Text color={!!errors.title ? "red.400" : "gray.400"}>
                      Title
                    </Text>
                    <Input
                      width="100%"
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.title}
                      value={values.title}
                    />
                    {!!errors.title && (
                      <Text color="red.400">{errors.title}</Text>
                    )}
                  </Flex>
                  <Flex width="100%" direction="column" justifyContent="flex-start">
                    <Text color={!!errors.supervisor ? "red.400" : "gray.400"}>
                      Supervisor
                    </Text>
                    <Input
                      width="100%"
                      name="supervisor"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.supervisor}
                      value={values.supervisor}
                    />
                    {!!errors.supervisor && (
                      <Text color="red.400">{errors.supervisor}</Text>
                    )}
                  </Flex>
                </Flex>
                <Flex mt={3} direction="column" justifyContent="flex-start">
                  <Text color={!!errors.description ? "red.400" : "gray.400"}>
                    Desescription
                  </Text>
                  <MdEditor name="description" onChange={({ html }) => setProjectInfo({ ...projectInfo, description: html })} style={{ height: '250px' }} renderHTML={text => mdParser.render(text)} />
                  {!!errors.description && (
                    <Text color="red.400">{errors.description}</Text>
                  )}
                </Flex>
                <Flex justifyContent="center">
                  <Button
                    width="100%"
                    mt={4}
                    colorScheme={"blackAlpha"}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Flex>
              </Box>
            </form>
          )}
        </Formik>
      </Flex>
    </SectionWrapper>
  );
};
