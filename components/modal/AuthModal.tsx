"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div
        ref={modalRef}
        className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row shadow-2xl border border-zinc-700"
      >
        <div className="relative md:w-1/2 w-full h-64 md:h-auto bg-black">
          <Image
            src="/wavely_logo_white.png"
            alt="Wavely Promo"
            fill
            className="object-contain p-10"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12 text-white md:w-1/2 w-full">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-6">
            Listen to your favorite <br />
            tracks with a free <br />
            <span className="text-green-400">Wavely</span> account
          </h2>

          <Link
            href="/sign-up"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-full text-center text-base transition mb-4"
          >
            Sign up for free
          </Link>

          <Link
            href="/sign-in"
            className="border border-white/30 hover:border-white text-white py-3 rounded-full text-center text-base transition mb-4"
          >
            Log in to Wavely
          </Link>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white mt-4 text-sm underline transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
