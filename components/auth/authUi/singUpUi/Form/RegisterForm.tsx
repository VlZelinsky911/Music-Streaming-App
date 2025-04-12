"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { z } from "zod";
import BtnBack from "../BtnBack";
import CustomCheckbox from "../CustomCheckbox";
import TermsOfService from "../../../legal/TermsOfService";
import Loading from "../../../loading/Loading";
import toast from "react-hot-toast";

const schema = z.object({
  newsOptIn: z.boolean().optional(),
  marketingOptIn: z.boolean().optional(),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "Прийміть умови, щоб продовжити." }),
  }),
});

type FormData = z.infer<typeof schema>;

export default function TermsPage() {
  const router = useRouter();
  const [progressWidth, setProgressWidth] = useState("w-0");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      newsOptIn: false,
      marketingOptIn: false,
      agreeTerms: true,
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth("w-full");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: FormData) => {
    const email = localStorage.getItem("signup_email");
    const password = localStorage.getItem("signup_password");
    const username = localStorage.getItem("signup_username");


    if (!email || !password || !username) {
      toast.error("Data not found. Please start registration again.");
      router.push("/sign-up");
      return;
    }

    setIsLoading(true);

				toast("🎧 Registration successful! Check your email to confirm and start the vibe ✨");
				setTimeout(() => {
					router.push("/sign-in");
				}, 3000); 

        localStorage.removeItem("signup_email");
        localStorage.removeItem("signup_password");
        localStorage.removeItem("signup_name");
  };

  return (
    <div className="flex justify-center bg-black text-white min-h-screen">
      <div className="w-full max-w-md px-8 py-4 relative">
        <BtnBack className="absolute top-7 left-0" />

        <p className="text-base text-gray-400 mb-1">Step 3 of 3</p>
        <h2 className="text-[15px] font-bold mb-4">Terms</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CustomCheckbox
            label="I want to receive news and offers from Spotify"
            className="bg-[#2A2A2A] p-4 rounded"
            {...register("newsOptIn")}
          />

          <CustomCheckbox
            label="Provide Spotify content providers with my registration details for marketing purposes. Please note that your data may be transferred to countries outside the EEA as described in the Privacy Policy."
            className="bg-[#2A2A2A] p-4 rounded"
            {...register("marketingOptIn")}
          />

          <CustomCheckbox
            label={
              <>
                I agree to{" "}
                <a
                  href="https://www.spotify.com/pl/legal/end-user-agreement/"
                  className="text-green-500 underline"
                  target="_blank"
                >
                  Terms of Spotify
                </a>
              </>
            }
            className="bg-[#2A2A2A] p-4 rounded"
            {...register("agreeTerms")}
          />

          {errors.agreeTerms && (
            <p className="text-red-500 text-sm -mt-2">
              {errors.agreeTerms.message}
            </p>
          )}

          <p className="text-sm text-neutral-400">
            To learn more about how we collect, use, protect and provide access
            to your personal data, please read{" "}
            <a
              href="https://www.spotify.com/pl/legal/privacy-policy/"
              className="text-green-500 underline"
              target="_blank"
            >
              Spotify Privacy Policy
            </a>
            .
          </p>

          <button
            type="submit"
            className={clsx(
              "w-full text-center font-bold py-3 px-4 rounded-full transition",
              isValid
                ? "bg-green-500 hover:bg-green-600 text-black"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            )}
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "Sign up"}
          </button>
        </form>
        <TermsOfService />
      </div>
    </div>
  );
}
