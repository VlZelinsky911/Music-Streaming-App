"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { supabase } from "../../../lib/supabaseClient";
import PasswordInput from "./PasswordInput";
import RequirementItem from "../authUi/singUpUi/RequirementItem";
import { z } from "zod";

const schema = z.object({
  password: z
    .string()
    .min(10, "Password must be at least 10 characters.")
    .refine((val) => /[a-zA-Z]/.test(val), {
      message: "Password must contain at least one letter.",
    })
    .refine((val) => /[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val), {
      message: "Password must contain a number or symbol.",
    }),
});

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumberOrSymbol = /[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
    password
  );
  const isMinLength = password.length >= 10;

  const isFormValid =
    hasLetter &&
    hasNumberOrSymbol &&
    isMinLength &&
    password === confirmPassword;

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast.error("Session not found. Try opening the email link again.");
      }
    };
    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const result = schema.safeParse({ password });
    if (!result.success) {
      result.error.errors.forEach((err) => toast.error(err.message));
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) toast.error(error.message);
    else {
      toast.success("Password updated successfully!");
      router.push("/sign-in");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0f0f0f] p-8 rounded-2xl w-full max-w-md shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Update your password
        </h1>

        <PasswordInput
          label="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
          show={showPassword}
          toggleShow={() => setShowPassword((prev) => !prev)}
          name="new-password"
        />

        <PasswordInput
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
          show={showConfirm}
          toggleShow={() => setShowConfirm((prev) => !prev)}
          name="confirm-password"
        />

        <ul className="text-sm space-y-2 mb-6">
          <RequirementItem label="1 letter" checked={hasLetter} />
          <RequirementItem
            label="1 number or 1 special character ( # ? ! & )"
            checked={hasNumberOrSymbol}
          />
          <RequirementItem label="10 characters" checked={isMinLength} />
        </ul>

        <button
          type="submit"
          disabled={loading || !isFormValid}
          className={`w-full font-bold py-3 px-4 rounded-full mt-2
    ${
      loading || !isFormValid
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600 text-black"
    }
  `}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
