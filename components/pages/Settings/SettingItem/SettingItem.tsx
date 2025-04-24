export default function SettingItem({
  label,
  value,
  handleUpdate,
}: SettingItemProps) {
  return (
    <>
      <div className="flex justify-between border-b border-neutral-700 py-3">
        <span className="text-gray-400 text-sm">{label}</span>
        {value && <span className="text-white text-xs">{value}</span>}
        {handleUpdate && (
          <button
            onClick={handleUpdate}
            className="text-xs text-red-500 hover:text-red-400 font-medium px-3 py-1 rounded-md transition"
          >
            Delete
          </button>
        )}
      </div>
    </>
  );
}
