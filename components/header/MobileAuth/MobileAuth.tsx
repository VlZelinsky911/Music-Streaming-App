"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Link from "next/link";
import { Button } from "@headlessui/react";

export default function MobileAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: user, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error getting user: ", error.message);
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(!!user);
        }
      } catch (err) {
        console.error("Error in useEffect:", err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

	const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="my-6">
      {isLoggedIn ? (
        <nav className="flex flex-col">
          <Link href="/profile">
            <h3 className="font-bold mb-3">Profile</h3>
          </Link>
          <Button onClick={handleLogout} className="text-left">
            <h3 className="font-bold">Logout</h3>
          </Button>
        </nav>
      ) : (
				<nav className="flex flex-col">
          <Link href="/sign-in">
            <h3 className="font-bold mb-3">Sign in</h3>
          </Link>
          <Link href="/sign-up">
            <h3 className="font-bold">Sign up</h3>
          </Link>
        </nav>
      )}
    </div>
  );
}
