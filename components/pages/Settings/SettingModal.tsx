import Image from "next/image";

export default function SettingModal({
  setIsOpen,
  loading,
  handleDeleteAccount,
}: SettingModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 backdrop-blur-lg transition-all"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="bg-zinc-800/60 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-700"
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
          <h2 className="text-3xl font-bold tracking-wide text-white text-center">
            Delete Account
          </h2>
          <p className="text-sm text-gray-400 mt-1 text-center">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <div className="flex justify-between mt-6 w-full max-w-sm">
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-300 hover:text-gray-200 font-medium px-5 py-2 rounded-md transition"
            >
              Cancel
            </button>
						<button
              className="text-xs text-red-500 hover:text-red-400 font-medium px-5 py-2 rounded-md transition"
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
