import React from "react";
import { Box, Input, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  type: string;
  placeHolder: string;
  value: string;
  onChange: any;
  name: string;
  error?: string;
}

export const FormInput: React.FC<Props> = ({
  title,
  type,
  placeHolder,
  value,
  onChange,
  error,
  name,
}) => {
  return (
    <Box w={350}>
      <Text mt={3} ml={2} mb={0.5} fontSize="1.1rem" color="gray.500">
        {title}
      </Text>
      <Input
        name={name}
        isInvalid={!!error}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        type={type}
      />
      <Text color="red.500">{error}</Text>
    </Box>
  );
};
