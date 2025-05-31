"use client";
import { usePathname } from "next/navigation";
import Player from "../player";
import { hidePlayerRoutes } from "../../../features/constants/hidePlayerRoutes/hidePlayerRoutes";

export default function PlayerWrapper() {
  const pathname = usePathname();
  const shouldShowPlayer = !hidePlayerRoutes.includes(pathname);

  if (!shouldShowPlayer) return null;
  return <Player />;
}
