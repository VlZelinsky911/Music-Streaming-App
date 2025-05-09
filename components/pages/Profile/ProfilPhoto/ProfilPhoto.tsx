import React, { useState, ChangeEvent, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useUserAvatar } from "../../../../hooks/useUserAvatar";

const ProfilePhoto: React.FC = () => {
	const { photo, uploadPhoto, loading, removeLastUploadedPhoto } = useUserAvatar();
	const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleApply = async () => {
    if (file) {
      await uploadPhoto(file);
      setFile(null);
      setPreview(null);
      setIsModalOpen(false);
    }
  };

  const handleCancel = async () => {
		await removeLastUploadedPhoto();
		setIsModalOpen(false);
		setPreview(null);
		setFile(null);
	};
	

  return (
    <>
      <div
        className="relative w-32 h-32 bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer transition duration-200 hover:ring-2 hover:ring-green-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {photo ? (
          <img
            src={photo}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-3xl">👤</span>
        )}

        {isHovered && (
          <div className="absolute inset-0 bg-opacity-50 z-50 backdrop-blur-sm transition-all rounded-full flex items-center justify-center">
            <FiEdit2 className="text-white text-3xl" />
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-lg transition-all z-50">
          <div className="bg-neutral-900 text-white p-6 rounded-xl shadow-lg w-96 text-center relative">
            <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-2 border-green-500"
              />
            )}

            <label className="cursor-pointer text-green-400 hover:underline block mb-4">
              Choose Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <div className="flex justify-center gap-4 mt-2">
              <button
                onClick={handleApply}
                disabled={!preview}
                className="bg-green-500 px-4 py-2 rounded-full text-sm hover:bg-green-400 transition disabled:opacity-50"
              >
                Apply
              </button>
              <button
                onClick={handleCancel}
                className="text-red-400 hover:underline text-sm"
              >
                Remove Photo
              </button>
            </div>

            <button
              onClick={() => {
                setIsModalOpen(false);
                setPreview(null);
								setFile(null);
              }}
              className="absolute top-2 right-5 text-gray-400 hover:text-white text-xl transition active:scale-95 cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePhoto;
