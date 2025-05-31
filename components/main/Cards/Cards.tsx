"use client";

import Link from "next/link";
import Image from "next/image";
import { covers } from "../../../features/constants/covers/covers";
import ScrollableRow from "../ScrollableRow/ScrollableRow";
import { useState } from "react";

export default function Cards({ title }: Pick<Track, "title">) {
		const [hoveredArtistId, setHoveredArtistId] = useState<number | null>(null);
	
  return (
    <ScrollableRow>
      <section className="mt-4 mb-8 bg-[#1E1E1E]/80 p-4 rounded-xl border border-zinc-700">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <Link href="/" className="text-sm text-gray-400 hover:underline">
            Show all
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {covers.map((track) => (
            <div key={track.title} className="w-[120px] flex-shrink-0 relative">
              <Image
                width={60}
                height={60}
                src={track.image}
                alt={track.title}
                className="w-[120px] h-[120px] object-cover rounded-lg mb-2  transition-transform duration-300 hover:scale-95 cursor-pointer"
							onMouseEnter={() => setHoveredArtistId(track.id)}
              onMouseLeave={() => setHoveredArtistId(null)}
              />
              <Image
                src="play_green_hover.svg"
                alt="play_green_hover"
                className={`absolute bottom-8 -right-2 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                  hoveredArtistId === track.id
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}
                width={20}
                height={20}
              />
              <h3 className="font-semibold truncate">{track.title}</h3>
              <p className="text-sm text-gray-400 truncate">{track.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </ScrollableRow>
  );
}
