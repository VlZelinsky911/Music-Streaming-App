export default function SettingItem({
  label,
  value,
  handleUpdate,
	handle2FAUpdate,
}: SettingItemProps) {
  return (
    <>
      <div className="flex justify-between border-b border-neutral-700 py-3">
        <span className="text-gray-400 text-sm">{label}</span>
        {value && <span className="text-white text-xs">{value}</span>}
        {handleUpdate && (
          <button
            onClick={handleUpdate}
            className="text-xs text-red-500 hover:text-red-400 font-medium px-3 py-1 rounded-md transition cursor-pointer"
          >
            Delete
          </button>
        )}
				{handle2FAUpdate && (
					<button
						onClick={handle2FAUpdate}
						className="text-xs text-green-500 hover:text-green-400 font-medium px-3 py-1 rounded-md transition cursor-pointer"
					>
						Update
					</button>
				)}
      </div>
    </>
  );
}
