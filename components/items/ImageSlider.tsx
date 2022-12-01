import React, { useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "@emotion/styled";

interface Props {
  images: string[];
}

export const ImageSlider: React.FC<Props> = ({ images }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step >= images.length - 1) {
      setStep(0);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step <= 0) {
      setStep(images.length - 1);
    } else {
      setStep(step - 1);
    }
  };

  return (
    <Box maxW="xl" position="relative">
      <Box
        onClick={handleNext}
        position="absolute"
        p={3}
        backgroundColor="white"
        right={4}
        cursor="pointer"
        top="45%"
        boxShadow="xl"
        width="auto"
        borderRadius="50%"
      >
        <FaChevronRight />
      </Box>
      <Box
        onClick={handleBack}
        position="absolute"
        cursor="pointer"
        p={3}
        left={4}
        top="45%"
        backgroundColor="white"
        boxShadow="xl"
        width="auto"
        borderRadius="50%"
      >
        <FaChevronLeft />
      </Box>
      <Image
        height="sm"
        width="xl"
        borderRadius="xl"
        src={images[step]}
        alt={`${images[step]}`}
      />
      <Flex gap={2} mt={4} justifyContent="center">
        {images.map((image, i) => (
          <Dot key={image} active={i === step} />
        ))}
      </Flex>
    </Box>
  );
};

const Dot = styled(Box)<{ active: boolean }>`
  border-radius: 50%;
  border: 1px solid black;
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${({ active }) => (active ? "black" : "white")};
`;
