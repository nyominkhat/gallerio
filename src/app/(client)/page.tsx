"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ImageSection from "@/components/ImageSection";

import useImages from "@/hooks/image/useImages";
import useSearch from "@/hooks/useSearch";

const Home = () => {
  const { data: session } = useSession();
  const { search } = useSearch();
  const router = useRouter();

  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useImages({
    search: search,
    currentUserId: session?.user.id!,
  });

  useEffect(() => {
    if (data) {
      const isFound = data.pages.map((page) => page.images.length !== 0);

      if (!isFound[0]) {
        router.push("/not-found");
      }
    }
  }, [data, router]);

  return (
    <div className="h-full flex container relative">
      <ImageSection
        data={data}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        refetch={refetch}
      />
    </div>
  );
};

export default Home;
