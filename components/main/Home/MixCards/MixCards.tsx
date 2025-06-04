"use client";

import { mixCards } from "../../../../features/constants/mixCard/mixCard";
import { useAuthRedirect } from "../../../../hooks/useAuthRedirect";
import Image from "next/image";
import AuthModal from "../../../modal/AuthModal";

export default function MixCard() {
  const { handleClick, showModal, handleClose } = useAuthRedirect(`/mixes/id`);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
        {mixCards.map((item, index) => (
          <div
            key={index}
						onClick={handleClick}
            className="bg-[#1E1E1E]/80 border border-zinc-700 hover:bg-[#2a2a2a] duration-300 rounded-lg flex items-center p-2 active:scale-95 transition-all cursor-pointer"
          >
            <Image
              width={14}
              height={14}
              src={item.image}
              alt={item.title}
              className="w-14 h-14 rounded-sm object-cover mr-4"
            />
            <h3 className="text-white text-sm font-semibold">{item.title}</h3>
          </div>
        ))}
      </div>
      {showModal && <AuthModal onClose={handleClose} />}
    </>
  );
}
