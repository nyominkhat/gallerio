import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "./ui/input";

import useSearch from "@/hooks/useSearch";

const SearchInput = () => {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 1000);
  const router = useRouter();
  const { setData, isClean } = useSearch();

  useEffect(() => {
    setData(value);

    if (value !== "") {
      router.push("/");
    }
  }, [value, setData, router]);

  useEffect(() => {
    if (isClean) {
      setText("");
    }
  }, [isClean]);

  return (
    <article className="flex hover:border-black/90 transition-all items-center gap-2 border ring-ring rounded-xl px-4 mr-2">
      <Search size={18} />
      <Input
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text}
        className="px-1 md:w-80 lg:w-96 border-none focus-visible:ring-0 outline-none shadow-none"
        placeholder="Search images"
      />
    </article>
  );
};

export default SearchInput;
