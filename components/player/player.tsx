"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Repeat,
  Shuffle,
  Heart,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function GlassPlayer() {
  const loading = useSelector((state: RootState) => state.auth.loading);
  const [isPlaying, setIsPlaying] = useState(true);

  if (loading) {
    return null;
  }
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl z-50
  bg-white/10 backdrop-blur-md border border-white/10 rounded-lg shadow-xl
  grid grid-cols-3 items-center px-4 py-2"
    >
      <div className="flex items-center gap-2 min-w-0 justify-self-start">
        <img
          src="/covers/cover1.svg"
          alt="Shape of You"
          className="w-10 h-10 rounded-md"
        />
        <div className="min-w-0">
          <div className="text-white text-sm font-medium truncate">
            Shape of You
          </div>
          <div className="text-xs text-gray-200 truncate">Ed Sheeran</div>
        </div>
        <button className="ml-1 text-gray-300 hover:text-white active:scale-95 transition">
          <Heart size={16} />
        </button>
      </div>

      <div className="flex flex-col items-center justify-self-center w-full">
        <div className="flex items-center gap-3 mb-1">
          <Shuffle className="w-3 h-3 text-gray-300 hover:text-white cursor-pointer" />
          <SkipBack className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" />
          <button
            className="bg-white text-black rounded-full p-1.5 shadow hover:scale-105 active:scale-95 transition"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
          <SkipForward className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" />
          <Repeat className="w-3 h-3 text-gray-300 hover:text-white cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-200 w-full">
          <span>1:45</span>
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden mx-2">
            <div className="h-full bg-white/70 w-2/5"></div>
          </div>
          <span>4:42</span>
        </div>
      </div>

      <div className="flex items-center gap-1 justify-self-end">
        <Volume2 className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" />
        <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white/70 w-3/4"></div>
        </div>
      </div>
    </div>
  );
}
