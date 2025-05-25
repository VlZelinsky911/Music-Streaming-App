import Link from "next/link";
import { genres } from "../../../features/constants/genres/genres";
import Image from "next/image";

export default function Cards({ title }: Pick<Track, "title">) {
  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link href="/" className="text-sm text-gray-400 hover:underline">
          Show all
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {genres.map((track) => (
          <div key={track.title} className="min-w-[60px] flex-shrink-0">
            <Image
              width={16}
              height={16}
              src={track.img}
              alt={track.title}
              className="w-full h-auto rounded-lg mb-2"
            />
            <h3 className="font-semibold truncate">{track.title}</h3>
            <p className="text-sm text-gray-400 truncate">{track.color}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
