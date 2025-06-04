"use client";

import Link from "next/link";
import Image from "next/image";
import { artists } from "../../../../features/constants/artists/artists";
import ScrollableRow from "../ScrollableRow/ScrollableRow";
import { useState } from "react";
import AuthModal from "../../../modal/AuthModal";
import { useAuthRedirect } from "../../../../hooks/useAuthRedirect";

export default function Artist({ title }: Pick<Track, "title">) {
  const [hoveredArtistId, setHoveredArtistId] = useState<number | null>(null);
  const { handleClick, showModal, handleClose } = useAuthRedirect(
    `/artists/${hoveredArtistId}`
  );

  return (
    <>
      <section className="mt-4 mb-8 bg-[#1E1E1E]/80 p-4 rounded-xl border border-zinc-700">
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <Link href="/" className="text-sm text-gray-400 hover:underline">
            Show all
          </Link>
        </div>
        <ScrollableRow>
          <div className="flex gap-6 overflow-x-auto scrollbar scrollbar-hide pb-2">
            {artists.map((artist) => (
              <div
                key={artist.id}
                onClick={handleClick}
                className="min-w-[150px] flex-shrink-0 cursor-pointer active:scale-95 transition-transform bg-[#1E1E1E]/80 p-4 rounded-xl border border-zinc-700 hover:bg-[#2a2a2a]"
                onMouseEnter={() => setHoveredArtistId(artist.id)}
                onMouseLeave={() => setHoveredArtistId(null)}
              >
                <div className="relative w-[140px] h-[140px]">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="rounded-full object-cover"
                  />

                  <Image
                    src="play_green_hover.svg"
                    alt="play_green_hover"
                    className={`absolute bottom-2 right-2 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                      hoveredArtistId === artist.id
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                    width={20}
                    height={20}
                  />
                </div>
                <h3 className="font-semibold truncate text-base">
                  {artist.name}
                </h3>
                <p className="text-sm text-gray-400 truncate">Artist</p>
              </div>
            ))}
          </div>
        </ScrollableRow>
      </section>

      {showModal && <AuthModal onClose={handleClose} />}
    </>
  );
}
