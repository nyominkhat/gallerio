import React from "react";

import { Button } from "./ui/button";

interface ImageEditButtonProps {
  css?: string;
}

const ImageEditButton = ({ css }: ImageEditButtonProps) => {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
      }}
      variant={"secondary"}
      className={`${css}`}
    >
      Edit
    </Button>
  );
};

export default ImageEditButton;
