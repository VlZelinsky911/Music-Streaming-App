"use client";

import React, { useState } from "react";

export default function EditProfileForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const isFormComplete = Object.values(formData).every((val) => val.trim() !== "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    // TODO: надіслати дані на сервер
  };

  const genderOptions = [
    "Чоловік",
    "Жінка",
    "Небінарний",
    "Інше",
    "Не хочу вказувати",
  ];

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">Редагування профілю</h2>

        {/* Username */}
        <div>
          <label className="block text-sm mb-1">Ім'я користувача</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ваш нікнейм"
            className="w-full p-3 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full p-3 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500"
            required
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm mb-1">Дата народження</label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="day"
              placeholder="ДД"
              value={formData.day}
              onChange={handleChange}
              maxLength={2}
              className="w-1/3 p-3 rounded-md bg-neutral-800 border border-neutral-700 text-white text-center"
              required
            />
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-1/3 p-3 rounded-md bg-neutral-800 border border-neutral-700 text-white"
              required
            >
              <option value="">Місяць</option>
              {[
                "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
                "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
              ].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <input
              type="text"
              name="year"
              placeholder="РРРР"
              value={formData.year}
              onChange={handleChange}
              maxLength={4}
              className="w-1/3 p-3 rounded-md bg-neutral-800 border border-neutral-700 text-white text-center"
              required
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm mb-1">Гендер</label>
          <div className="grid grid-cols-2 gap-2">
            {genderOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleGenderSelect(option)}
                className={`py-2 px-4 rounded-md border text-sm transition-all
                  ${
                    formData.gender === option
                      ? "bg-indigo-500 text-white border-indigo-400"
                      : "bg-neutral-800 border-neutral-700 hover:bg-neutral-700"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm mb-1">Країна / місто</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Україна, Київ"
            className="w-full p-3 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-neutral-700 text-white font-semibold hover:bg-neutral-600 transition disabled:opacity-50"
          disabled={!isFormComplete}
        >
          Next
        </button>
      </form>
    </div>
  );
}
