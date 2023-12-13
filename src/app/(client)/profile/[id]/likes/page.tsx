"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import useUserLikedImages from "@/hooks/user/useUserLikedImages";
import ImageSection from "@/components/ImageSection";

const Likes = () => {
  const params = useParams();
  const { data: session } = useSession();

  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useUserLikedImages({
    userId: params.id as string,
    currentUserId: session?.user.id,
  });

  return (
    <section className='container'>
      <ImageSection
        data={data}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        refetch={refetch}
        noMoreText='No more data here.'
      />
    </section>
  );
};

export default Likes;
