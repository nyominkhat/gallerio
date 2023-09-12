"use client";

import { ImageIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { MouseEvent, useCallback } from "react";

import { Button } from "@/components/ui/button";

import useIsMounted from "@/hooks/useIsMounted";

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

interface ImageUploadButtonProps {
  onChange: (value: string) => void;
  css?: string;
  text: string;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  onChange,
  css,
  text,
}) => {
  const isMounted = useIsMounted();

  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  if (!isMounted) {
    return null;
  }

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        function handleOnClick(
          e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) {
          e.preventDefault();
          open();
        }

        return (
          <Button
            className={`${css} flex items-center gap-1`}
            variant={"secondary"}
            onClick={(
              e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
            ) => handleOnClick(e)}
          >
            <ImageIcon size={15} />
            {text}
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUploadButton;
