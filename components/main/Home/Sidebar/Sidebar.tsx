'use client';

import { Home, Search, Library, Plus, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { icon: <Home size={20} />, label: "Home", href: "/" },
  { icon: <Search size={20} />, label: "Search", href: "/search" },
  { icon: <Library size={20} />, label: "Your Library", href: "/library" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-neutral-900 text-white py-6 px-4 space-y-6 border-r border-neutral-800">
      <nav className="space-y-4">
        {sidebarItems.map(({ icon, label, href }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-4 text-sm font-medium px-2 py-2 rounded hover:text-white hover:bg-neutral-800 transition ${
                isActive ? "font-bold text-white" : "text-gray-400"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-neutral-800 pt-4 space-y-4">
        <Link
          href="/create"
          className="flex items-center gap-4 text-sm font-medium px-2 py-2 text-gray-400 hover:text-white hover:bg-neutral-800 rounded transition"
        >
          <div className="bg-neutral-400 p-1 rounded-sm">
            <Plus size={16} className="text-black" />
          </div>
          <span>Create Playlist</span>
        </Link>

        <Link
          href="/liked"
          className="flex items-center gap-4 text-sm font-medium px-2 py-2 text-white hover:bg-neutral-800 rounded transition"
        >
          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-sm">
            <Heart size={16} fill="white" stroke="white" />
          </div>
          <span>Liked Songs</span>
        </Link>
      </div>
    </aside>
  );
}
