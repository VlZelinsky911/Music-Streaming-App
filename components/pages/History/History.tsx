import React from "react";
import { Heart } from "lucide-react";
import { FiClock } from "react-icons/fi";

const trackHistory = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    playedAt: "2025-05-21T10:30:00Z",
    durationMs: 200000,
    cover: "https://i.scdn.co/image/ab67616d0000b2739cde2c4a9e3e5e55b2a35a47",
  },
  {
    id: "2",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    playedAt: "2025-05-20T15:20:00Z",
    durationMs: 203000,
    cover: "https://i.scdn.co/image/ab67616d0000b2735dbf7076e840933dca7e238f",
  },
  // ...other tracks
];

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

export default function TrackHistoryPage() {
  return (
    <div className="min-h-screen bg-[#1E1E1E]/80 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Listening History</h1>
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
          {trackHistory.map(
            (
              { id, title, artist, album, playedAt, durationMs, cover },
              index
            ) => (
              <tr
                key={id}
                className="group hover:bg-gray-800 transition-colors"
              >
                <td className="p-2 text-gray-400">{index + 1}</td>
                <td className="flex items-center gap-4 p-2">
                  <img
                    src={cover}
                    alt={title}
                    className="w-10 h-10 rounded-sm object-cover"
                  />
                  <div>
                    <div className="text-white font-medium">{title}</div>
                    <div className="text-gray-400 text-xs">{artist}</div>
                  </div>
                </td>
                <td className="hidden md:table-cell p-2 text-gray-300">
                  {album}
                </td>
                <td className="hidden md:table-cell p-2 text-gray-400">
                  {formatDate(playedAt)}
                </td>
                <td className="p-2 text-right text-green-500">
                  <Heart
                    size={16}
                    fill="currentColor"
                    className="inline-block"
                  />
                </td>
                <td className="p-2 text-right text-gray-300">
                  {formatDuration(durationMs)}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
