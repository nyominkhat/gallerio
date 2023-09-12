"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import useSearch from "@/hooks/useSearch";

const NotFound = () => {
  const router = useRouter();
  const { search, clearSearch } = useSearch();

  return (
    <section className="w-full gap-20 flex items-center h-full justify-center flex-col relative container">
      <p className="absolute top-4 left-4 text-4xl font-semibold capitalize">
        {search}
      </p>

      <figure className="w-40">
        <Image
          src="/lost.png"
          width={400}
          height={400}
          alt="404"
          className="w-full h-auto"
        />
      </figure>

      <p
        className="text-sm cursor-pointer text-slate-600 hover:text-slate-800 transition-all"
        onClick={() => {
          clearSearch();
          router.push("/");
        }}
      >
        Try to make me proud
      </p>
    </section>
  );
};

export default NotFound;
