import React, { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { SectionWrapper } from "components/wrappers/SectionWrapper";
import { createState } from "state";

interface Props {
  onNext: () => void;
}

export const ImageUpload: React.FC<Props> = ({ onNext }) => {
  const [projectInfo, setProjectInfo] = useRecoilState(createState);

  useEffect(() => {}, []);

  const onChange = (
    value: ImageListType,
    addUpdatedIndex?: number[] | undefined
  ) => {
    setProjectInfo({ ...projectInfo, images: value });
  };

  return (
    <SectionWrapper>
      <Flex
        my={8}
        justifyContent="center"
        alignItems="center"
        direction="column"
        width="100%"
      >
        <Text fontSize="1.5rem" align="center">
          Input images for this project
        </Text>
        <ImageUploading
          multiple
          acceptType={["png", "jpg"]}
          value={projectInfo.images}
          onChange={onChange}
          maxNumber={6}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <Flex direction="column" alignItems="center" gap={5}>
              <Button
                mt={5}
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </Button>
              <Grid
                gap={4}
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
              >
                {imageList.map((image, index) => (
                  <Box
                    boxShadow="2xl"
                    borderRadius="xl"
                    position="relative"
                    key={`${image.dataURL}__${index}`}
                  >
                    <Image
                      borderRadius="xl"
                      maxW="md"
                      height="xs"
                      src={image["data_url"]}
                      alt={`${image.dataURL}__${index}`}
                    />
                    <Flex gap={3} position="absolute" left={0} top={0}>
                      <Button
                        colorScheme="red"
                        onClick={() => onImageRemove(index)}
                      >
                        <FaTrash />
                      </Button>
                      <Button
                        colorScheme="blue"
                        onClick={() => onImageUpdate(index)}
                      >
                        <FaEdit />
                      </Button>
                    </Flex>
                  </Box>
                ))}
              </Grid>
            </Flex>
          )}
        </ImageUploading>
        {!!projectInfo.images.length && (
          <Button onClick={onNext} mt={10}>
            Continue
          </Button>
        )}
      </Flex>
    </SectionWrapper>
  );
};
