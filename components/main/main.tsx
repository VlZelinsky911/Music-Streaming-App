import React from "react";
import SearchBarMobile from "./SearchBarMobile/SearchBarMobile";
import MixCard from "./MixCards/MixCards";
import Genres from "../searchPage/Genres/Genres";
import Cards from "./Cards/Cards";
import Sidebar from "./Sidebar/Sidebar";
import Greeting from "./Greeting/Greeting";
import Artist from "./Artist/Artist";
import ScrollableRow from "./ScrollableRow/ScrollableRow";

export default function Main() {
  return (
    <div className="flex h-full bg-neutral-900 text-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 mb-5 sm:hidden bg-neutral-900 rounded-2xl">
          <SearchBarMobile />
        </div>

        <div className="flex-1 overflow-y-auto -pr-1 p-6 bg-neutral-900 rounded-2xl">
          <Greeting />

          <MixCard />

          <Artist title="Popular artists" />

          <Cards title="New releases" />

          <Cards title="You top mixed" />
          <Cards title="Uniquely yours" />
          <Cards title="Jump back in" />
          <Cards title="Just the hits" />
        </div>
      </main>
    </div>
  );
}
