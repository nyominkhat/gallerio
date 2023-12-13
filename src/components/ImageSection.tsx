"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import Masonry from "react-masonry-css";

import ImageCard from "./ImageCard";
import Loading from "./Loading";

import { breakpointColumnsObj } from "@/lib/masonryBreakPoint";

import { imageTypes } from "@/types/image";

interface ImageSectionProps {
  data: any;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
  isLoading: boolean;
  noMoreText?: string;
}

const ImageSection = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  refetch,
  isLoading,
  noMoreText,
}: ImageSectionProps) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='flex flex-col relative justify-between w-full'>
      {/* {data && <div className="absolute -left-20">{data.pages.length}</div>} */}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='masonry-grid'
        columnClassName='masonry-grid_column'
      >
        {data &&
          data.pages.map((page: any) =>
            page.images.map((image: imageTypes) => (
              <ImageCard key={image.id} data={image} refetch={refetch} />
            ))
          )}
      </Masonry>

      {/* fetch data */}
      <div className='absolute bottom-1/3 invisible' ref={ref}>
        fetch more
      </div>

      {data && (isFetchingNextPage || hasNextPage) && (
        <div className='py-10 flex items-center justify-center'>
          <Loader2 size={30} className='animate-spin' />
        </div>
      )}

      {!isLoading && !hasNextPage && (
        <p className='text-sm font-semibold text-center'>{noMoreText}</p>
      )}
    </section>
  );
};

export default ImageSection;
