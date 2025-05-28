import Link from "next/link";
import Image from "next/image";
import { artists } from "../../../features/constants/artists/artists";
export default function Artist({ title }: Pick<Track, "title">) {
  return (
    <section className="mt-4 mb-8 bg-[#1E1E1E]/80 p-4 rounded-xl border border-zinc-700">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link href="/" className="text-sm text-gray-400 hover:underline">
          Show all
        </Link>
      </div>
      <div className="flex gap-6 overflow-x-auto scrollbar scrollbar-hide pb-2">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="min-w-[180px] flex-shrink-0 group cursor-pointer"
          >
            <div className="relative w-[180px] h-[180px] mb-3">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="rounded-full object-cover transition-transform duration-300 group-hover:scale-95"
              />
            </div>
            <h3 className="font-semibold truncate text-base">{artist.name}</h3>
            <p className="text-sm text-gray-400 truncate">Artist</p>
          </div>
        ))}
      </div>
    </section>
  );
}
