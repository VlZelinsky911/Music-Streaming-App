import { Camera, Search } from 'lucide-react';

export default function SearchBarMobile() {
  return (
    <div className="px-2 pt-2 pb-2">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold">Search</h2>
				<Camera className="w-8 h-8 text-white" />
			</div>

      <div className="relative">
        <input
          type="text"
          placeholder="What do you want to listen to?"
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-black placeholder-gray-500 focus:outline-none"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={20} />
      </div>
    </div>
  );
}
