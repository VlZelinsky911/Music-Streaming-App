import Link from "next/link";
import { genres } from "../../../features/constants/genres/genres";
import Image from "next/image";
import { covers } from "../../../features/constants/covers/covers";

export default function Cards({ title }: Pick<Track, "title">) {
  return (
    <section className="mt-4 mb-8 bg-[#1E1E1E]/80 p-4 rounded-xl border border-zinc-700">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link href="/" className="text-sm text-gray-400 hover:underline">
          Show all
        </Link>
      </div>

      <div className="flex  gap-4 overflow-x-auto scrollbar-hide">
        {covers.map((track) => (
          <div key={track.title} className="w-[120px] flex-shrink-0">
            <Image
              width={60}
              height={60}
              src={track.image}
              alt={track.title}
              className="w-[120px] h-[120px] object-cover rounded-lg mb-2 transition-transform duration-300 hover:scale-95"
            />
            <h3 className="font-semibold truncate">{track.title}</h3>
            <p className="text-sm text-gray-400 truncate">{track.artist}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
