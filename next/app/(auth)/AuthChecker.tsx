"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/use-auth";

const AuthChecker = () => {
  const {user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/sign-in");
    }
  }, [user,isLoading, router]);

  return null;
};

export default AuthChecker;
