import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import useIsMounted from "@/hooks/useIsMounted";

const LoadingCard = () => {
  const heights = ["h-[30rem]", "h-60", "h-80"];

  const randomIndex = Math.floor(Math.random() * heights.length);

  const randomHeight = heights[randomIndex];

  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <Skeleton className={`w-full my-4 ${randomHeight} rounded-none`} />;
};

export default LoadingCard;
