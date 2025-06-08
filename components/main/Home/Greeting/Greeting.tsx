"use client";

import React, { useEffect, useState } from "react";
import useFetchUser from "../../../../hooks/useFetchUser";
import UserMenu from "../../../header/UserMenu/UserMenu";
import Arrows from "../Arrows/Arrows";

export default function Greeting() {
  const [greeting, setGreeting] = useState<string>("");
  

  useFetchUser();

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-5 gap-4">
        <div className="flex items-center gap-2">
         <Arrows/>
        </div>

        <UserMenu />
      </div>

      <h2 className="text-2xl font-bold text-white">{greeting}</h2>
    </div>
  );
}
