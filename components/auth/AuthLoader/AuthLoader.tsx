"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchUser } from "../../../features/auth/authSlice";

export default function AuthLoader() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return null;
}
