import React from "react";
import { sidebarSections } from "../../features/constants/sidebarSections/sidebarSections";
import { cards } from "../../features/constants/cards/cards";

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

      <main className="flex-1 m-2 bg-neutral-900 rounded-2xl flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto scroll-smooth -pr-1 px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Explore All</h2>


          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 pb-8">
            {cards.map(({ title, color }) => (
              <div
                key={title}
                className={`relative rounded-xl ${color} p-4 h-36 flex flex-col justify-start shadow-md active:scale-95 transition-transform cursor-pointer`}
              >
                <h3 className="text-lg font-bold z-10">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}


