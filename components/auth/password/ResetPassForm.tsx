"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Link from "next/link";
import toast from "react-hot-toast";
import router from "next/router";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

		const { data: existingUser, error: fetchError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

		if (fetchError || !existingUser) {
			toast.error("User not found. Redirecting to sign-up...");
			setTimeout(() => router.push("/sign-up"), 2000);
			return;
		}

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email for a password reset link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleReset}
        className="bg-[#0f0f0f] p-8 rounded-2xl w-full max-w-md shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Reset your password
        </h1>

        <label className="block text-sm font-semibold mb-2">
          Email address
        </label>
        <input
          type="email"
          required
          placeholder="name@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-600 bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-full mt-2"
        >
          Send Reset Link
        </button>

        <div className="text-sm text-center mt-4">
          <Link href="/sign-in" className="text-gray-400 hover:underline">
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
}
