"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import BtnBack from "../BtnBack";
import { z } from "zod";
import { FiChevronDown } from "react-icons/fi";
import TermsOfService from "../../../legal/TermsOfService";


const currentYear = new Date().getFullYear();

const schema = z.object({
  username: z.string().min(1, "Name is required"),
  birthDay: z.string().min(1, "Day is required"),
  birthMonth: z.string().min(1, "Month is required"),
  birthYear: z
    .string()
    .regex(
      /^(19[0-9]{2}|20[0-2][0-9]|2025)$/,
      "Enter a valid year from 1900 to 2025"
    )
    .refine((val) => parseInt(val) <= currentYear, {
      message: "The year cannot be in the future.",
    }),
  gender: z.string().min(1, "Please select a gender"),
});

type FormData = z.infer<typeof schema>;


export default function AboutPage() {
  const router = useRouter();
  const [progressWidth, setProgressWidth] = useState("w-0");
	const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const gender = watch("gender");

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth("w-2/3");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = (data: FormData) => {	
    router.push("/sign-up/register");
  };

  return (
    <div className="flex justify-center bg-black text-white min-h-screen">
      <div className="w-full max-w-md px-8 py-4 relative">
        <BtnBack className="absolute top-7 left-0" />

        <p className="text-base text-gray-400 mb-1">Step 2 of 3</p>
        <h2 className="text-[15px] font-bold mb-4">Tell us about yourself</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username" className="text-sm font-semibold block mb-2">Name</label>
          <input
						id="username"
            type="text"
            {...register("username")}
            className="w-full bg-black border border-gray-600 text-white p-3 rounded-md mb-1 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="This name will show on your profile"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mb-4">{errors.username.message}</p>
          )}

          <label htmlFor="birthDay" className="text-sm font-semibold block mb-2">
            Date of Birth
          </label>
          <div className="flex gap-2 mb-1">
            <input
							id="birthDay"
              type="number"
              placeholder="DD"
              {...register("birthDay")}
              className="w-1/3 p-3 rounded-md bg-black border border-gray-600 text-white appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onInput={(e: any) => {
                const value = parseInt(e.target.value, 10);
                if (value < 1) e.target.value = 1;
                else if (value > 31) e.target.value = 1;
              }}
            />
            <div className="relative w-1/3">
              <select
                defaultValue=""
                {...register("birthMonth")}
                className="w-full p-3 rounded-md bg-black border border-gray-600 text-white appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              >
                <option value="" disabled>
                  Month
                </option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
            </div>
            <input
              type="number"
              placeholder="YYYY"
              maxLength={4}
              {...register("birthYear")}
              className="w-1/3 p-3 rounded-md bg-black border border-gray-600 text-white appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onInput={(e: any) => {
                if (e.target.value.length > 4)
                  e.target.value = e.target.value.slice(0, 4);
              }}
            />
          </div>
          {(errors.birthDay || errors.birthMonth || errors.birthYear) && (
            <p className="text-red-500 text-sm mb-4">
              {errors.birthDay?.message ||
                errors.birthMonth?.message ||
                errors.birthYear?.message}
            </p>
          )}

          <label className="text-sm font-semibold block mb-2">Gender</label>
					<input type="hidden" {...register("gender")} />
          <div className="grid grid-cols-2 gap-2 mb-6">
            {["Male", "Female", "Non-binary", "Other", "Prefer not to say"].map(
              (option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setValue("gender", option, { shouldValidate: true })
                  }
                  className={clsx(
                    "border rounded-md px-4 py-2 text-sm",
                    gender === option
                      ? "border-green-500 text-white bg-green-600"
                      : "border-gray-600 text-gray-300"
                  )}
                >
                  {option}
                </button>
              )
            )}
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mb-4">{errors.gender.message}</p>
          )}

          <button
            type="submit"
            className={clsx(
              "w-full text-center font-bold py-3 px-4 rounded-full transition",
              isValid
                ? "bg-green-500 hover:bg-green-600 text-black"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            )}
          >
            Next
          </button>
        </form>

        <TermsOfService />
      </div>
    </div>
  );
}