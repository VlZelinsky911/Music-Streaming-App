"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useFetchUser from "../../../../hooks/useFetchUser";
import { supabase } from "../../../../lib/supabaseClient";
import UserMenu from "../../../header/UserMenu/UserMenu";
import { useRouter } from "next/navigation";

export default function Greeting() {
  const [greeting, setGreeting] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanGoBack(window.history.length > 1);
    }
  }, []);

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
    <div className="mb-5">
      <div className="flex items-center justify-between mb-5 gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => canGoBack && router.back()}
            disabled={!canGoBack}
            className="cursor-pointer active:scale-95"
          >
            <Image src="/arrowBack.svg" width={25} height={25} alt="Back" />
          </button>
          <button
            className="cursor-pointer active:scale-95"
            onClick={() =>
              typeof window !== "undefined" && window.history.forward()
            }
          >
            <Image
              src="/arrowForward.svg"
              width={25}
              height={25}
              alt="Forward"
            />
          </button>
        </div>

        <UserMenu />
      </div>

      <h2 className="text-2xl font-bold text-white">{greeting}</h2>
    </div>
  );
}
