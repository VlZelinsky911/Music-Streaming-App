import React from "react";
import { sidebarSections } from "../../features/constants/sidebarSections/sidebarSections";
import SearchBarMobile from "./SearchBarMobile/SearchBarMobile";
import MixCard from "./MixCards/MixCards";
import Genres from "./Genres/Genres";
import Cards from "./Cards/Cards";

export default function Main() {
  return (
    <div className="flex h-full bg-black text-white overflow-hidden">
      <aside className="hidden md:block m-2 w-72 bg-neutral-900 p-6 space-y-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Your Library</h2>
        {sidebarSections.map(({ title, text, button }) => (
          <div key={title} className="bg-neutral-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-400 mb-3">{text}</p>
            <button className="bg-white text-black rounded-full px-4 py-2 hover:bg-gray-200 transition">
              {button}
            </button>
          </div>
        ))}
      </aside>
      <main className="flex-1 m-2 flex flex-col overflow-hidden">
        <div className="p-4 mb-5 sm:hidden bg-neutral-900 rounded-2xl">
          <SearchBarMobile />
        </div>

        <div className="flex-1 overflow-y-auto  -pr-1 p-6 bg-neutral-900 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Browse All</h2>

					<MixCard/>

					<Cards title="New releases"/>
					<Cards title="Trending"/>

					<Genres/>
        </div>
      </main>
    </div>
  );
}
