"use client";

import React, { useEffect, useState } from "react";


export default function Greeting() {
  const [greeting, setGreeting] = useState<String>("");

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
  });
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{greeting}</h2>
    </>
  );
}
