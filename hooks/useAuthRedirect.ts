"use client";

import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store";

export const useAuthRedirect = (redirectPath: string) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    router.push(redirectPath);
  }, [isLoggedIn, router, redirectPath]);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  return {
    handleClick,
    showModal,
    handleClose,
  };
};
