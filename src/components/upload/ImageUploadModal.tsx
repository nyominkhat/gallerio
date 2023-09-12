import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

import ImageUpload from "./ImageUpload";
import Modal from "../Modal";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

import useUploadModal from "@/hooks/modal/useUploadModal";
import useImageUpload from "@/hooks/image/useImageUpload";
import useImages from "@/hooks/image/useImages";

const ImageUploadModal = () => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const { isOpen, onClose } = useUploadModal();

  const { mutate, isLoading, isError, isSuccess, error } = useImageUpload();
  const { refetch } = useImages({
    search: "",
    currentUserId: session?.user.id,
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Upload",
        description: "Image uploaded successfully!",
      });

      refetch();
      onClose();
    }

    if (isError) {
      toast({
        variant: "destructive",
        title: "Upload",
        description: "Something went wrong!",
      });
    }
  }, [isError, isSuccess, toast, onClose]);

  const handleSubmit = () => {
    if (!imageSrc || !session) {
      return;
    }

    mutate({
      tag,
      description,
      url: imageSrc,
      userId: session.user.id,
    });

    setTimeout(() => {
      setImageSrc("");
      setTag("");
      setDescription("");
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit a photo">
      <ImageUpload onChange={(value) => setImageSrc(value)} value={imageSrc} />

      <Input
        placeholder="Add a tag"
        onChange={(e) => {
          setTag(e.target.value);
        }}
      />

      <Input
        placeholder="Add a description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <Button className="flex items-center gap-2" onClick={handleSubmit}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Uploading image
          </>
        ) : (
          "Upload"
        )}
      </Button>
    </Modal>
  );
};

export default ImageUploadModal;
