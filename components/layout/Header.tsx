import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SectionWrapper } from "../wrappers/SectionWrapper";
import { GetCurrentUser, Logout } from "api";

export const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  useEffect(() => {
    GetCurrentUser().then((user) => {
      setUser(user);
    });
  }, [router.pathname]);

  const handleLogout = () => {
    Logout().then(({ success }) => {
      if (success) {
        setShowSettings(false);
        router.push("/login");
      }
    });
  };

  return (
    <HeaderWrapper>
      <SectionWrapper>
        <ContentWrapper>
          <Img
            onClick={() => router.push("/")}
            src="/logo.png"
            alt="logo"
            width="100%"
          />
          <ul>
            {user ? (
              <Flex gap={5} position="relative">
                <li onClick={() => router.push("/create")}>Create project</li>
                <Text
                  cursor="pointer"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  {user.name}
                </Text>
                {showSettings && (
                  <Box
                    p={2}
                    boxShadow="xl"
                    borderRadius="xl"
                    backgroundColor="white"
                    position="absolute"
                    right={0}
                    top={8}
                  >
                    <Button onClick={handleLogout}>Log out</Button>
                  </Box>
                )}
              </Flex>
            ) : (
              <li onClick={() => router.push("/login")}>Login</li>
            )}
          </ul>
        </ContentWrapper>
      </SectionWrapper>
    </HeaderWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    list-style: none;
    display: flex;
    gap: 2rem;

    li {
      &:hover {
        text-decoration: underline;
        color: grey;
        cursor: pointer;
      }
    }
  }
`;

const HeaderWrapper = styled.div`
  padding: 1rem 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Img = styled.img`
  max-width: 3rem;
`;
