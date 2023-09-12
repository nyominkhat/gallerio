"use client";

import React from "react";
import { usePathname } from "next/navigation";

import Navbar from "@/components/Navbar";
import ImageUploadModal from "@/components/upload/ImageUploadModal";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const currentPath = usePathname();

  return (
    <>
      {currentPath === "/signin" || currentPath === "/register" ? null : (
        <Navbar />
      )}

      <main className={`flex-grow flex-1 py-8`}>{children}</main>
      <ImageUploadModal />
    </>
  );
};

export default LayoutProvider;
