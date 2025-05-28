"use client";

import React from "react";
import Genres from "../main/Genres/Genres";
import Sidebar from "../main/Sidebar/Sidebar";
import SearchBar from "../header/SearchBar/SearchBar";

export default function searchPage() {
  return (
    <div className="flex h-full bg-neutral-900 text-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
					<SearchBar />

        <div className="flex-1 overflow-y-auto -pr-1 p-6 bg-neutral-900 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">Browse all</h2>
          <Genres />
        </div>
      </main>
    </div>
  );
}
