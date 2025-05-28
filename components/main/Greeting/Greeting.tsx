"use client";

import React, { useEffect, useState } from "react";
import UserMenu from "../../header/UserMenu/UserMenu";
import useFetchUser from "../../../hooks/useFetchUser";
import { supabase } from "../../../lib/supabaseClient";

export default function Greeting() {
  const [greeting, setGreeting] = useState<String>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setIsAuthenticated(!!data?.user);
    };
    checkAuth();
  }, []);

  return (
    <div
      className="hidden md:block w-full rounded-lg shadow-lg p-6 mb-6"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #1ed760 0%, #1DB954 70%, #191414 100%)",
      }}
    >
      <div className="hidden md:flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">{greeting}</h2>
          <p className="text-gray-100 text-sm">
            {isAuthenticated
              ? "Great to see you again on Wawely!"
              : "Sign up to enjoy your music streaming experience! 🎵"}
          </p>
        </div>
        <UserMenu />
      </div>
    </div>
  );
}
