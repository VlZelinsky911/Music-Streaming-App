"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../../../loading/Loading";
import { supabase } from "../../../../../lib/supabaseClient";
import useProfileSetupOnLogin from "../../../../../hooks/useProfileSetupOnLogin";
import Link from "next/link";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type FormData = z.infer<typeof schema>;

export default function EmailForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });


  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Login error: " + error.message);
      setIsLoading(false);
      return;
    }

    toast.success("Congratulations! You have successfully logged in.");
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-left">
      <label htmlFor="email" className="text-sm font-semibold mb-2 block">
        Email address
      </label>
      <input
        id="email"
        type="email"
        placeholder="name@domain.com"
        {...register("email")}
        className="w-full p-3 rounded-md border border-gray-600 bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
      )}

      <label htmlFor="password" className="text-sm font-semibold block mt-4 mb-2">Password</label>
      <div className="relative mb-4">
        <input
					id="password"
          type={showPassword ? "password" : "text"}
          className="w-full bg-black border border-gray-600 text-white p-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          {...register("password")}
          placeholder="Enter your password"
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

      <Link
        href="/reset-password"
        className="text-xs text-gray-400 hover:text-white transition-colors duration-200 ml-auto block text-right"
      >
        Reset password
      </Link>

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-full mt-4"
      >
        {isLoading ? <Loading /> : "Login"}
      </button>
    </form>
  );
}
