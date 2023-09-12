export interface imageUploadProps {
  url: string;
  tag: string;
  description: string;
  userId?: string;
}

export interface getImagesProps {
  search?: string;
  currentUserId?: string;
}

export interface getUserImagesProps {
  userId: string;
  currentUserId?: string;
}

export interface getUserLikedImagesProps {
  userId: string;
  currentUserId?: string;
}

export interface getImageProps {
  imageId: string;
  currentUserId?: string;
}

export interface imageTypes {
  id: string;
  tag: string;
  description: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    image: string;
    email: string;
  };
  likeBy: {
    id: string;
    userId: string;
    isLiked: boolean;
  }[];
  isLiked: boolean;
}

export interface likeCreateTypes {
  userId: string;
  imageId: string;
}

export interface likeByTypes {
  id: string;
  imageId: string;
  userId: string;
  isLiked: boolean;
}

export interface getUserDataProps {
  userId?: string;
}
