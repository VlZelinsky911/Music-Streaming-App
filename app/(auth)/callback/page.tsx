"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import Loading from "../../../components/auth/loading/Loading";

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error retrieving session:", error.message);
        router.push("/sign-in");
        return;
      }

      if (session) {
        console.log("User is signed in:", session.user);
        router.push("/");
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Loading />
    </div>
  );
};

export default AuthCallback;
