import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { SectionWrapper } from "components/wrappers/SectionWrapper";
import { ProjectCard } from "components/items/ProjectCard";
import { useRecoilState } from "recoil";
import { createState } from "state";
import { CreateProject, GetCurrentUser } from "api";
import { useRouter } from "next/router";

export const ProjectSummary = () => {
  const [projectInfo, setProjectInfo] = useRecoilState(createState);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    GetCurrentUser().then((possibleUser) => setUser(possibleUser));
  }, []);

  const handlePublish = () => {
    const { description, supervisor, images, title } = projectInfo;
    const imagesArr = images.map((image) => image["data_url"]);
    CreateProject(title, description, supervisor, imagesArr).then((project) => {
      if (project) {
        router.push("/");
        setProjectInfo({
          images: [],
          title: "",
          description: "",
          supervisor: "",
        });
      }
    });
  };

  return (
    <SectionWrapper>
      <Flex
        my={8}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="1.5rem" align="center">
          Here&apos;s your project summary{" "}
        </Text>
        <Box mt={5} maxW="md">
          <ProjectCard
            onClick={false}
            CreatedAt={new Date().toISOString()}
            ID={1}
            author={user ? user.name : "Pijus"}
            description={projectInfo.description}
            title={projectInfo.title}
            supervisor={projectInfo.supervisor}
            images={projectInfo.images.map((image) => image["data_url"])[0]}
          />
        </Box>
        <Button onClick={handlePublish} mt={9} colorScheme="blackAlpha">
          Publish project
        </Button>
      </Flex>
    </SectionWrapper>
  );
};
