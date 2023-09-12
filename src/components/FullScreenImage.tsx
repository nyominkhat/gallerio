import React from "react";

interface FullScreenImageProps {
  viewImage: boolean;
  setViewImage: (isView: boolean) => void;
  alt: string;
  src: string;
}

const FullScreenImage = ({
  viewImage,
  setViewImage,
  alt,
  src,
}: FullScreenImageProps) => {
  return (
    <figure
      onClick={(e) => {
        e.stopPropagation();
        setViewImage(false);
      }}
      className="w-screen h-screen cursor-zoom-out overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 md:flex hidden"
    >
      <img
        onClick={() => {
          setViewImage(true);
        }}
        src={src}
        loading="lazy"
        className={`w-full h-auto min-h-full transition-all 
            ${viewImage ? "cursor-zoom-out" : "cursor-zoom-in"}`}
      />
    </figure>
  );
};

export default FullScreenImage;
