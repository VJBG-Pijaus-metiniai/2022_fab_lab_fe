import { atom } from "recoil";
import { ImageListType } from "react-images-uploading";

export const createState = atom<{
  images: ImageListType;
  title: string;
  description: string;
  supervisor: string;
}>({
  key: "user_state",
  default: {
    images: [],
    title: "",
    description: "",
    supervisor: "",
  },
});
