import React from 'react'
import Link  from 'next/link';
import TermsOfService from '../../../components/ui/legal/TermsOfService';
import SocialButton from '../../../components/ui/authUi/socialButton';
import EmailFormIN from '../../../components/ui/authUi/singInUi/Form/EmailFormIN';
import Image from 'next/image';

export const metadata = {
	title: 'Sign In - Spotify Clone',
	description: 'Sign in to start listening to music in Spotify Clone',
	icons: {
		icon: 'spoti_logo_title.svg',
	},
};
export default function SignInPage(){	
return (
		<div className="flex min-h-screen items-center justify-center bg-black text-white">
					<div className="w-full max-w-md p-8 bg-black text-center">
						<header>
							<Image
								src="spoti_logo_white.svg"
								alt="Spotify Logo"
								className="mx-auto w-12 mb-6"
								width={48}
  							height={48}
							/>
							<h1 className="mx-auto w-[320px] text-3xl font-bold mb-15">
									Sign in to Spotify
							</h1>
						</header>
		
						<main>
								<SocialButton/>
						</main>
		
						<footer>
							<div className="flex items-center my-6">
								<hr className="flex-grow border-gray-600" />
								<span className="mx-4 text-gray-400">or</span>
								<hr className="flex-grow border-gray-600" />
							</div>
							
							<EmailFormIN/>

							<p className="text-sm text-gray-400 mt-6">
								Already have an account?{" "}
								<Link href="/sign-up" className="text-white underline">
									Sign up here.
								</Link>
							</p>
		
							<TermsOfService />
						</footer>
					</div>
				</div>
	)
}


