import { Box } from "@chakra-ui/react";
import React from "react";

export const SectionWrapper: React.FC = ({ children }) => {
  return (
    <Box mx="auto" maxW="7xl">
      <Box mx={4}>{children}</Box>
    </Box>
  );
};
