import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineInbox } from "react-icons/hi";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-black w-full flex items-center justify-center">
      <div
        className={`
          flex items-center px-4 py-2 rounded-full
          bg-neutral-800 transition-all duration-200
          hover:bg-neutral-700 focus-within:ring-1 focus-within:ring-white
          w-80
        `}
      >

        <HiOutlineSearch className="mr-3 text-gray-400 w-5 h-5" />

        <input
          type="text"
          placeholder="What do you want to play?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 outline-none"
        />

        <div className="h-5 w-px bg-gray-600 mx-2" />

        {query ? (
          <button onClick={() => setQuery("")} className="text-gray-400 hover:text-white">
            <FaTrash className="text-base" />
          </button>
        ) : (
          <HiOutlineInbox className="text-gray-400 w-5 h-5" />
        )}
      </div>
    </div>
  );
}
