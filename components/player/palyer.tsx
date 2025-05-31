"use client";

import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart } from "lucide-react";

export default function GlassPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl z-50
      bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-lg
      flex items-center px-6 py-3">
      
     
      <div className="flex items-center gap-3 min-w-0 w-1/3">
        <img
          src="/covers/cover1.svg"
          alt="Shape of You"
          className="w-12 h-12 rounded-md"
        />
        <div className="min-w-0">
          <div className="text-white font-medium truncate">Shape of You</div>
          <div className="text-xs text-gray-200 truncate">Ed Sheeran</div>
        </div>
        <button className="ml-2 text-gray-300 hover:text-white">
          <Heart size={18} />
        </button>
      </div>

      {/* Center: Controls */}
      <div className="flex flex-col items-center flex-1 mx-6 left-20">
        <div className="flex items-center gap-5 mb-1">
          <Shuffle className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" />
          <SkipBack className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
          <button
            className="bg-white text-black rounded-full p-2 shadow hover:scale-105 transition"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <SkipForward className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
          <Repeat className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-200 w-full">
          <span>1:45</span>
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden mx-2">
            <div className="h-full bg-white/70 w-2/5"></div>
          </div>
          <span>4:42</span>
        </div>
      </div>

      {/* Right: Volume */}
      <div className="flex items-center gap-2 w-1/4 justify-end">
        <span className="text-xs text-gray-200"> </span>
        <Volume2 className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
        <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white/70 w-3/4"></div>
        </div>
      </div>
    </div>
  );
}