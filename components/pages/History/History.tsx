"use client";

import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { FiClock } from "react-icons/fi";
import { supabase } from "../../../lib/supabaseClient";
import toast from "react-hot-toast";
import NoTracksFound from "./NoTracksFound";

export default function TrackHistoryPage() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from("track_history")
        .select(
          `
          played_at,
          tracks (
            id, title, artist, album, cover, duration_ms
          )
        `
        )
        .order("played_at", { ascending: false });

      if (error) {
        console.error(error);
        toast.error(error.message);
        return;
      } else {
        const formatted = data.map((item: any) => ({
          ...item.tracks,
          played_at: item.played_at,
        }));
        setTracks(formatted);
      }
    };

    fetchHistory();
  }, []);

  function formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return (
    <div className="min-h-screen bg-[#1E1E1E]/80 text-white p-8">
      <h1 className="text-center text-2xl font-bold mb-3 sm:text-left sm:text-4xl sm:mb-6">
        Listening History
      </h1>
      {tracks.length === 0 ? (
        <NoTracksFound />
      ) : (
        <table className="w-full text-sm table-auto">
          <thead className="border-b border-gray-700 text-gray-400 uppercase text-xs">
            <tr>
              <th className="text-left w-8 p-2">#</th>
              <th className="text-left p-2">Track</th>
              <th className="hidden md:table-cell text-left p-2">Album</th>
              <th className="hidden md:table-cell text-left p-2">Date</th>
              <th className="text-right p-2">❤</th>
              <th className="w-10 text-center p-2">
                <FiClock className="mx-auto text-gray-400" size={16} />
              </th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => (
              <tr
                key={track.id}
                className="group hover:bg-gray-800 transition-colors"
              >
                <td className="p-2 text-gray-400">{index + 1}</td>
                <td className="flex items-center gap-4 p-2">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-10 h-10 rounded-sm object-cover"
                  />
                  <div>
                    <div className="text-white font-medium">{track.title}</div>
                    <div className="text-gray-400 text-xs">{track.artist}</div>
                  </div>
                </td>
                <td className="hidden md:table-cell p-2 text-gray-300">
                  {track.album}
                </td>
                <td className="hidden md:table-cell p-2 text-gray-400">
                  {formatDate(track.played_at)}
                </td>
                <td className="p-2 text-right text-green-500">
                  <Heart
                    size={16}
                    fill="currentColor"
                    className="inline-block"
                  />
                </td>
                <td className="p-2 text-right text-gray-300">
                  {formatDuration(track.duration_ms)}
                </td>
              </tr>
						))}
          </tbody>
        </table>
      )}
    </div>
  );
}
