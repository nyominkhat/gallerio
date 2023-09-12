"use client";

import React from "react";
import { useSession } from "next-auth/react";

import Loading from "@/components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ImageSection from "@/components/ImageSection";

import useUser from "@/hooks/user/useUser";
import useUserImages from "@/hooks/user/useUserImages";

interface ProfileProps {
  params: {
    id: string;
  };
}

const Profile = ({ params }: ProfileProps) => {
  const { data: session } = useSession();

  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useUserImages({
    userId: params.id,
    currentUserId: session?.user.id,
  });

  return (
    <section className="container">
      <ImageSection
        data={data}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        refetch={refetch}
      />
    </section>
  );
};

export default Profile;
