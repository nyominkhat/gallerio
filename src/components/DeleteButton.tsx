import React, { useEffect } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

import useDeleteImage from "@/hooks/image/useDeleteImage";
import useImages from "@/hooks/image/useImages";
import { useSession } from "next-auth/react";
import useSearch from "@/hooks/useSearch";

interface DeleteButtonProps {
  imageId: string;
}

const DeleteButton = ({ imageId }: DeleteButtonProps) => {
  const router = useRouter();
  const { search } = useSearch();

  const { data: session } = useSession();

  const { toast } = useToast();
  const { mutate, isLoading, isError, isSuccess, error } = useDeleteImage();

  const { refetch: imagesRefetch } = useImages({
    search: search,
    currentUserId: session?.user.id!,
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Deleting Image",
        description: "Image deleted successfully!",
      });

      imagesRefetch();

      router.back();
    }

    if (isError) {
      toast({
        variant: "destructive",
        title: "Somethings went wrong!",
      });
    }
  }, [isSuccess, isError, toast, error, router, imagesRefetch]);

  const handleDeleteImage = () => {
    mutate(imageId);
  };

  return (
    <Button
      onClick={handleDeleteImage}
      className="flex items-center font-normal gap-2"
      variant={"destructive"}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          Deleting
        </>
      ) : (
        <>
          <Trash2 size={18} />
          Delete
        </>
      )}
    </Button>
  );
};

export default DeleteButton;
