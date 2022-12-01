import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { IoMdCheckmark } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";

interface Props {
  currStep: number;
  steps: string[];
  onBack: () => void;
}

export const ProgressBar: React.FC<Props> = ({ currStep, steps, onBack }) => {
  return (
    <Box mt={20} mx="auto" maxW="md">
      <Flex
        alignItems="center"
        gap={2}
        cursor="pointer"
        onClick={onBack}
        justifyContent="center"
        mb={4}
      >
        <FaChevronLeft />
        <Text fontWeight={600}>Back</Text>
      </Flex>
      <Flex position="relative" justifyContent="space-between">
        <Line />
        {steps.map((step, i) => (
          <Flex
            key={`${step}__${i}`}
            justifyContent="center"
            direction="column"
            alignItems="center"
          >
            <Dot current={currStep} step={i}>
              {currStep > i && (
                <IoMdCheckmark color="#FFF" size="1.25rem" fontWeight={700} />
              )}
            </Dot>
            <Text>{step}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

const Line = styled(Box)`
  position: absolute;
  border-top: 3px solid black;
  width: 90%;
  left: 5%;
  top: 20%;
  z-index: -1;
`;

const Dot = styled(Box)<{ current: number; step: number }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid black;

  ${({ current, step }) => {
    if (current === step) {
      return `
        background-color: black;
      `;
    } else if (current < step) {
      return `
        background-color: white;
      `;
    } else {
      return `
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
      `;
    }
  }}
`;
