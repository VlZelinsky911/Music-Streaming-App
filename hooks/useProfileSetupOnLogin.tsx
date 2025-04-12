"use client";

import { useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useProfileSetupOnLogin = () => {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const { data: freshUserData, error: userError } = await supabase.auth.getUser();

          if (userError || !freshUserData?.user) {
            return;
          }

          const user = freshUserData?.user;

          if (user.email_confirmed_at) {
            const { data: profileExists, error: profileError } = await supabase
              .from("profiles")
              .select("id")
              .eq("id", user.id)
              .maybeSingle();

            if (profileError) {
              toast.error("Error while verifying profile.");
              console.error(profileError);
              return;
            }

            if (!profileExists) {
              const { error: insertError } = await supabase.from("profiles").insert({
                id: user.id,
                email: user.email,
                username: user.user_metadata.username,
                birth_date: user.user_metadata.birth_date,
                gender: user.user_metadata.gender,
                news_opt_in: user.user_metadata.news_opt_in,
                marketing_opt_in: user.user_metadata.marketing_opt_in,
                agree_terms: user.user_metadata.agree_terms,
              });

              if (insertError) {
                toast.error("Failed to save profile.");
                console.error(insertError);
              } else {
                toast.success("Profile created 🎉");
              }
            } else {
              console.log("The profile already exists. Skipping insertion.");
            }
          } else {
            toast.error("Email not confirmed!");
            router.push("/sign-in");
          }
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);
};

export default useProfileSetupOnLogin;
