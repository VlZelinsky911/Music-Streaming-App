'use client';

import Image from 'next/image';
import { supabase } from '../../../lib/supabaseClient';
import { OAUTH_PROVIDERS, OAuthProviderId } from '../../../types/oauthProviders';


export default function SocialButton() {
  const handleOAuthSignIn = async (provider: OAuthProviderId) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });

    if (error) console.error(`${provider} sign-in error:`, error.message);
  };

  return (
    <>
      {OAUTH_PROVIDERS.map(({ id, label, icon }) => (
        <button
          key={id}
          className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-full mb-3 relative cursor-pointer"
          onClick={() => handleOAuthSignIn(id)}
        >
          <Image
            src={icon}
            alt={id}
            className="w-6 h-6 mr-2 absolute left-6"
            width={24}
            height={24}
          />
          {label}
        </button>
      ))}
    </>
  );
}
