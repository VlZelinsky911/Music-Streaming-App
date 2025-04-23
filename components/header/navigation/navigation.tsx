import Link from "next/link";
import React from "react";
import { MdHomeFilled } from "react-icons/md";
import SearchBar from "../searchBar/SearchBar";

export default function Navigation() {
  return (
		<div className="flex items-center gap-2">
      <Link
        href="/"
        className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 scale-105 shadow-lg transition duration-200 ease-in-out"
      >
        <MdHomeFilled className="text-white text-xl" />
      </Link>

      <SearchBar />
		</div>
  );
}
