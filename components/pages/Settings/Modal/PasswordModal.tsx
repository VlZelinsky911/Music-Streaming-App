"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const schema = z
  .object({
    currentPassword: z.string().min(6, "Required"),
    newPassword: z.string().min(8, "Min 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function PasswordModal({
  setShowPasswordModal,
}: PasswordModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-lg transition-all rounded-2xl"
      onClick={() => setShowPasswordModal((prev) => !prev)}
    >
      <div
        className="w-[80%] p-5 sm:w-full bg-zinc-800/80 backdrop-blur-md sm:p-8 rounded-2xl shadow-2xl max-w-md border border-zinc-700"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src="/wavely_logo_white.png"
          alt="Wavely Logo"
          className="mx-auto mb-4"
          width={60}
          height={60}
          priority
        />
        <h2 className="text-xl sm:text-3xl font-bold tracking-wide text-white text-center mb-1">
          Change Password
        </h2>
        <p className="text-[12px] text-gray-400 text-center mb-6">
          Enter your current and new password
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Current Password"
              {...register("currentPassword")}
              className="p-2 w-full sm:p-3 rounded-md bg-neutral-700/60 placeholder-gray-400 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
            {errors.currentPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="New Password"
              {...register("newPassword")}
              className="p-2 w-full sm:p-3 rounded-md bg-neutral-700/60 placeholder-gray-400 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
            {errors.newPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="p-2 w-full sm:p-3 rounded-md bg-neutral-700/60 placeholder-gray-400 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setShowPasswordModal((prev) => !prev)}
              className="text-xs text-gray-300 hover:text-gray-200 font-medium px-5 py-2 rounded-md transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-xs text-green-400 hover:text-green-300 font-medium px-5 py-2 rounded-md transition cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
