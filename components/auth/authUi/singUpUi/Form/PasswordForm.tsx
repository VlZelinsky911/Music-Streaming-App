"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import BtnBack from "../BtnBack";
import TermsOfService from "../../../legal/TermsOfService";
import RequirementItem from "../RequirementItem";


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

type FormData = z.infer<typeof schema>;

export default function PasswordForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [progressWidth, setProgressWidth] = useState("w-0");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const password = watch("password") || "";

  const { hasLetter, hasNumberOrSymbol, isMinLength } =
    validatePassword(password);

  const onSubmit = (data: FormData) => {
		localStorage.setItem("signup_password", data.password);
    router.push("/sign-up/about");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth("w-1/3");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-white text-left relative">
      <BtnBack className="absolute -left-8 top-3 text-gray-400 hover:text-white" />

      <p className="text-base text-gray-400 mb-1">Step 1 of 3</p>
      <h2 className="text-[15px] font-bold mb-4">Create a password</h2>

      <label className="text-sm font-semibold block mb-2">Password</label>
      <div className="relative mb-1">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Create your password"
          className="w-full bg-black border border-gray-600 text-white p-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          {...register("password")}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
      )}

      <p className="text-sm font-semibold mb-2 mt-4">Password requirements:</p>
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
        disabled={!isValid}
        className={clsx(
          "w-full text-center font-bold py-3 px-4 rounded-full transition",
          isValid
            ? "bg-green-500 hover:bg-green-600 text-black"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
        )}
      >
        Next
      </button>

      <TermsOfService />
    </form>
  );
}

function validatePassword(password: string) {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumberOrSymbol = /[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const isMinLength = password.length >= 10;
  return { hasLetter, hasNumberOrSymbol, isMinLength };
}
