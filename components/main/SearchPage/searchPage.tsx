"use client";

import React from "react";
import Genres from "./Genres/Genres";
import Sidebar from "../Home/Sidebar/Sidebar";
import SearchHeader from "./searchHeader/searchHeader";


export default function searchPage() {
  return (
    <div className="flex h-full bg-neutral-900 text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
				<SearchHeader />

        <div className="flex-1 overflow-y-auto -pr-1 p-6 bg-neutral-900 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">Browse all</h2>
					Кастомний елемент артисти 
					Кстимни елемент жанри
          <Genres />
        </div>
      </main>
    </div>
  );
}
