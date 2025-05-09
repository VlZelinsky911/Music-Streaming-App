"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiChevronDown } from "react-icons/fi";
import toast from "react-hot-toast";
import { supabase } from "../../../../lib/supabaseClient";
import type { Session } from '@supabase/auth-helpers-nextjs';
import { genderOptions, monthNames } from "../../../../features/constants/formOptions";



const currentYear = new Date().getFullYear();

const schema = z.object({
  username: z.string().min(2, "Username is too short"),
  email: z.string().email("Invalid email"),
  day: z.string().regex(/^\d{1,2}$/, "Invalid day"),
  month: z.string().min(1, "Month is required"),
  year: z
			.string()
			.regex(
				/^(19[0-9]{2}|20[0-2][0-9]|2025)$/,
				"Enter a valid year from 1900 to 2025"
			)
			.refine((val) => parseInt(val) <= currentYear, {
				message: "The year cannot be in the future.",
			}),
  gender: z.string().min(1, "Gender is required"),
  location: z.string().min(2, "Location is required"),
});

type FormData = z.infer<typeof schema>;

export default function EditProfileForm() {
	const [session, setSession] = useState<Session | null>(null);
	
  const {
    register,
    handleSubmit,
    formState: { isValid ,errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
		mode: "onChange",
  });

  const selectedGender = watch("gender");

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();
  }, []);

  const onSubmit = async (data: FormData) => {
    const response = await fetch("/api/edit-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error("Error while saving.");
      console.error("Failed:", result.error);
    } else {
      toast.success("Profile saved!");
    }
  };

	useEffect(() => {
		const fetchProfile = async () => {
			
			if (!session) return;
	
			const res = await fetch("/api/get-profile", {
				headers: {
					Authorization: `Bearer ${session.access_token}`,
				},
			});
	
			if (!res.ok) {
				console.error("Error loading profile");
				return;
			}
	
			const profile = await res.json();
	
			setValue("username", profile.username || "");
			setValue("email", profile.email || "");
			setValue("gender", profile.gender || "");
			setValue("location", profile.location || "");
	
			if (profile.birth_date) {
				const [year, month, day] = profile.birth_date.split("-");
				setValue("day", day);
				setValue("month", monthNames[parseInt(month) - 1]);
				setValue("year", year);
			}
		};
	
		fetchProfile();
	}, [session , setValue]);
	


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-neutral-900 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 text-white"
      >
        <h2 className="text-2xl font-semibold text-center">Edit Profile</h2>


        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            {...register("username")}
            placeholder="Your nickname"
            className="w-full p-3 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500"
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="example@email.com"
            className="w-full p-3 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

       
        <div>
          <label className="block text-sm mb-1">Date of Birth</label>
          <div className="flex space-x-2">
            <input
              {...register("day")}
              placeholder="DD"
              maxLength={2}
              className="w-1/3 p-3 rounded-md bg-neutral-800 border border-neutral-700 text-white text-center"
            />
            <div className="relative w-1/3">
              <select
                {...register("month")}
                className="w-full p-3 rounded-md bg-neutral-800 border border-neutral-700 text-white appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              >
                <option value="" >Month</option>
                {monthNames.map((month) => (
                  <option key={month} value={month} >
                    {month}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
            </div>

            <input
              {...register("year")}
							type="number"
              placeholder="YYYY"
              maxLength={4}
              className="w-1/3 p-3 rounded-md bg-neutral-800 border border-neutral-700 text-white text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							onInput={(e: any) => {
                if (e.target.value.length > 4)
                  e.target.value = e.target.value.slice(0, 4);
              }}
            />
          </div>
          {(errors.day || errors.month || errors.year) && (
            <p className="text-red-400 text-sm mt-1">
              {errors.day?.message ||
                errors.month?.message ||
                errors.year?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Gender</label>
          <input type="hidden" {...register("gender")} />
          <div className="grid grid-cols-2 gap-2">
            {genderOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setValue("gender", option, { shouldValidate: true })
                }
                className={`py-2 px-4 rounded-md border text-sm transition-all
                  ${
                    selectedGender === option
                      ? "border-green-500 text-white bg-green-600"
                      : "bg-neutral-800 border-neutral-700 hover:bg-neutral-700"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.gender && (
            <p className="text-red-400 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Country / City</label>
          <input
            {...register("location")}
            placeholder="Ukraine, Kyiv"
            className="w-full p-3 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500"
          />
          {errors.location && (
            <p className="text-red-400 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-full  text-white font-semibold  ${
    isValid
      ? 'bg-green-500 hover:bg-green-600 text-white'
      : 'bg-neutral-700 cursor-not-allowed text-white'
  }`}
					disabled={!isValid}
        >
          Save
        </button>
      </form>
    </div>
  );
}
