import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SectionWrapper } from "components/wrappers/SectionWrapper";
import { DeleteProject, GetCurrentUser, GetProject } from "api";
import { ImageSlider } from "components/items/ImageSlider";
import {
  BsPersonCircle,
  BsFillJournalBookmarkFill,
  BsTrash,
} from "react-icons/bs";
import { MdSupervisorAccount } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ProjectPage = () => {
  const router = useRouter();
  const { project_id } = router.query;
  const [projectInfo, setProjectInfo] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  console.log(projectInfo);

  useEffect(() => {
    GetProject(project_id as string).then((project) => {
      setProjectInfo(project);
    });

    GetCurrentUser().then((user) => {
      setUser(user);
    });
  }, []);

  const handleDelete = () => {
    DeleteProject(projectInfo.ID).then((info) => {
      if (info.success) {
        router.push("/");
      }
    });
  };

  return projectInfo ? (
    <SectionWrapper>
      <Flex gap={9} my={10}>
        <Box>
          <ImageSlider images={projectInfo.images.split("{")} />
          <Box mt={5}>
            <Flex alignItems="center" gap={4}>
              <BsPersonCircle size="1.75rem" />
              <Text fontSize="1.25rem" fontWeight={500}>
                {projectInfo.author}
              </Text>
            </Flex>
            <Flex alignItems="center" gap={4}>
              <MdSupervisorAccount size="1.75rem" />
              <Text fontSize="1.25rem" fontWeight={500}>
                {projectInfo.supervisor}
              </Text>
            </Flex>
            {user && user.name === projectInfo.author && (
              <Flex gap={1} mt={2}>
                <Button onClick={handleDelete} colorScheme="red">
                  <BsTrash />
                </Button>
                <Button colorScheme="blue">
                  <FaEdit />
                </Button>
              </Flex>
            )}
          </Box>
        </Box>
        <Box>
          <Text fontWeight={600} fontSize="2rem">
            {projectInfo.title}
          </Text>
          <Flex
            alignItems="center"
            my={3}
            pb={1}
            borderBottom="2px solid grey"
            color="gray.500"
            gap={1}
          >
            <BsFillJournalBookmarkFill />
            <Text width="100%">Description</Text>
          </Flex>
          <Text dangerouslySetInnerHTML={{ __html: projectInfo.description }} maxW="sm" color="gray.600" />
        </Box>
      </Flex>
    </SectionWrapper>
  ) : (
    <Spinner mx="auto" mt={20} />
  );
};

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default ProjectPage;
