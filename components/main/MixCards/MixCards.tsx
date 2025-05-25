import React from 'react'
import { mixCards } from '../../../features/constants/mixCard/mixCard'
import Image from "next/image";

export default function MixCard() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
			{mixCards.map((item, index) => (
				<div
					key={index}
					className="bg-neutral-800 hover:bg-neutral-700 duration-200 rounded-lg flex items-center p-2 active:scale-95 transition-transform cursor-pointer" 
				>
					<Image
						width={14}
						height={14}
						src={item.image}
						alt={item.title}
						className="w-14 h-14 rounded-sm object-cover mr-4"
					/>
					<h3 className="text-white text-sm font-semibold">{item.title}</h3>
				</div>
			))}
		</div>
	)
}