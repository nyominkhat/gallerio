"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Loading from "@/components/Loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageUploadButton from "@/components/upload/ImageUploadButton";

import useUser from "@/hooks/user/useUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import useEditUser from "@/hooks/user/useEditUser";
import { Loader2 } from "lucide-react";

const Setting = () => {
  const params = useParams();
  const [imageSrc, setImageSrc] = useState("");
  const [name, setName] = useState("");

  const { data, isLoading, refetch } = useUser({ userId: params.id as string });

  const {
    mutate,
    isLoading: mutationIsLoading,
    isError,
    error,
    isSuccess,
  } = useEditUser();

  const onSubmit = () => {
    mutate({
      userId: params.id as string,
      image: imageSrc === "" ? data.image : imageSrc,
      name: name === "" ? data.name : name,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="container flex items-center justify-center">
      <Card className="w-[640px]">
        <CardHeader>
          <CardTitle>Edit profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            value={name === "" ? data.name : name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className=" flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={
                  imageSrc
                    ? imageSrc
                    : data.image
                    ? data.image
                    : "/black-profile.avif"
                }
                alt="Avatar"
              />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <ImageUploadButton
              onChange={(value) => setImageSrc(value)}
              text="Change profile image"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            className="flex "
            onClick={onSubmit}
            variant={"outline"}
          >
            {mutationIsLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            Edit
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Setting;
