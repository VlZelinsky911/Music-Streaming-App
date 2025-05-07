import React from 'react'
import Edit from '../../../../../components/pages/Profile/Edit/Edit';

export const metadata = {
  title: "Wavely - Edit Profile",
  description: "Wavely is a most popular music streaming service in the world",
  icons: {
    icon: "/wavely_logo_title_green.png",
  },
};

export default function EditProfilePage() {
	return (
		<div className='bg-gradient-to-b from-neutral-800 to-black p-8'>
			{/* <div className="bg-neutral-800/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-neutral-700">
			
			</div> */}

			<Edit/>
		</div>
	)
}