import React from "react";
import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center fixed top-0 left-0 inset-0 z-[500]">
      <PuffLoader color="#000" size={60} />
    </div>
  );
};

export default Loading;
