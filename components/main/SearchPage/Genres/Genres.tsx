import React from "react";
import { genres } from "../../../../features/constants/genres/genres";
import Image from "next/image";

export default function Genres() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 pb-8">
      {genres.map(({ title, color, img }) => (
        <div
          key={title}
          className={`relative rounded-xl ${color} p-4 h-36 flex flex-col justify-start shadow-md active:scale-95 transition-transform cursor-pointer overflow-hidden`}
        >
          <h3 className="text-lg font-bold z-10">{title}</h3>
          <Image
            width={24}
            height={24}
            src={img}
            alt={title}
            className="w-24 h-24 absolute -bottom-1 -right-0"
          />
        </div>
      ))}
    </div>
  );
}
