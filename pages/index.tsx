import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Grid, Input } from "@chakra-ui/react";
import { ProjectCard } from "components/items/ProjectCard";
import { SectionWrapper } from "components/wrappers/SectionWrapper";
import { GetProjects } from "api";

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    GetProjects().then(({ data }) => {
      if (data) {
        setProjects(data);
      }
    });
  }, []);

  return (
    <div>
      <Head>
        <title>VJBG FABLAB</title>
        <meta
          name="description"
          content="Vilniaus Jono Basanavičiaus Gimnazijos FABLAB darbai"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SectionWrapper>
        <Input
          placeholder="Search projects"
          mt={8}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Grid mx={1} templateColumns="repeat(3, 1fr)" mt={5} gap={3}>
          {!!projects.length &&
            projects
              .filter(({ title }) => (title as string).includes(search))
              .map((project: any) => (
                <ProjectCard onClick key={project.ID} {...project} />
              ))}
        </Grid>
      </SectionWrapper>
    </div>
  );
};

export default Home;
