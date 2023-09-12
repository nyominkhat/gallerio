"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { MouseEvent, useCallback } from "react";

import useIsMounted from "@/hooks/useIsMounted";

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

interface ImageUploadProps {
  onChange: (value: string) => void;
  value?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const isMounted = useIsMounted();

  const handleUpload = useCallback(
    (result: any) => {
      // console.log("upload img", result.info.secure_url);

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
        function handleOnClick(e: MouseEvent<HTMLDivElement>) {
          e.preventDefault();
          open();
        }

        return (
          <div
            onClick={(e: MouseEvent<HTMLDivElement>) => handleOnClick(e)}
            className="relative flex flex-col h-80 items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-600"
          >
            <ImageIcon size={30} />
            <div className="text-base font-semibold">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  alt={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
