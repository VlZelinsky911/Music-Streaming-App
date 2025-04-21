import { HiOutlineSearch } from "react-icons/hi";

export default function InputSearch() {
  return (
    <div
      className="
        flex items-center px-4 py-2 rounded-full
        bg-neutral-800 transition-all duration-200
        hover:bg-neutral-700 focus-within:ring-2 focus-within:ring-white
        w-full max-w-md
      "
    >
      <HiOutlineSearch className="mr-2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="What do you want to play?"
        className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 outline-none"
      />
      <button className="ml-2 text-white opacity-60 hover:opacity-100">
        🗑️
      </button>
    </div>
  );
}
