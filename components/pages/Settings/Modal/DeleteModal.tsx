import Image from "next/image";

export default function DeleteModal({
  setIsOpen,
  loading,
  handleDeleteAccount,
}: SettingModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-lg transition-all rounded-2xl"
        onClick={() => setIsOpen(false)}
      >
        <div
          className=" w-[85%] p-7 sm:w-full bg-zinc-800/80 backdrop-blur-md sm:p-10 rounded-2xl shadow-2xl max-w-md border border-zinc-700"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src="/wavely_logo_white.png"
            alt="Wavely Logo"
            className="mx-auto mb-4"
            width={60}
            height={60}
            priority
          />
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-white text-center">
            Delete Account
          </h2>
          <p className="text-sm text-gray-400 mt-1 text-center">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <div className="flex justify-between mt-6 w-full max-w-sm">
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-300 hover:text-gray-200 font-medium px-5 py-2 rounded-md transition cursor-pointer"
            >
              Cancel
            </button>
						<button
              className="text-xs text-red-500 hover:text-red-400 font-medium px-5 py-2 rounded-md transition cursor-pointer"
              onClick={handleDeleteAccount}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
