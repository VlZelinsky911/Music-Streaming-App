import Link from "next/link";
import Image from "next/image";
import { artists } from "../../../features/constants/artists/artists";
import ScrollableRow from "../ScrollableRow/ScrollableRow";
export default function Artist({ title }: Pick<Track, "title">) {
  return (
    <ScrollableRow>
      <section className="mt-4 mb-8 bg-[#1E1E1E]/80 p-4 rounded-xl border border-zinc-700">
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <Link href="/" className="text-sm text-gray-400 hover:underline">
            Show all
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto scrollbar scrollbar-hide pb-2">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artist/${artist.id}`}
              className="min-w-[150px] flex-shrink-0 group cursor-pointer active:scale-95 transition-transform bg-[#1E1E1E]/80 p-4 rounded-xl border border-zinc-700"
            >
              <div className="relative w-[145px] h-[145px]">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="rounded-full object-cover transition-transform duration-300 group-hover:scale-95"
                />

                <Image
                  src="play_green_hover.svg"
                  alt="play_green_hover"
                  className="absolute bottom-2 right-2 w-14 h-14 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                  width={20}
                  height={20}
                />
              </div>
              <h3 className="font-semibold truncate text-base">
                {artist.name}
              </h3>
              <p className="text-sm text-gray-400 truncate">Artist</p>
            </Link>
          ))}
        </div>
      </section>
    </ScrollableRow>
  );
}
