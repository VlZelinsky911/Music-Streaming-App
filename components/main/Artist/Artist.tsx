import Link from "next/link";
import { genres } from "../../../features/constants/genres/genres";
import Image from "next/image";
import { artists } from "../../../features/constants/artists/artists";

export default function Artist({ title }: Pick<Track, "title">) {
  return (
    <section className="mt-4 mb-8 bg-[#1E1E1E]/80 p-4 rounded-xl border border-zinc-700">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link href="/" className="text-sm text-gray-400 hover:underline">
          Show all
        </Link>
      </div>

      <div className="flex  gap-4 overflow-x-auto scrollbar-hide">
        {artists.map((artist) => (
          <div
            key={artist.name}
            className="max-w-[160px] flex-shrink-0"
          >
            <Image
              width={16}
              height={16}
              src={artist.image}
              alt={artist.name}
              className="w-full h-auto rounded-[50%] mb-2"
            />
            <h3 className="font-semibold truncate">{artist.name}</h3>
            <p className="text-sm text-gray-400 truncate">Artist</p>
          </div>
        ))}
      </div>
    </section>
  );
}
