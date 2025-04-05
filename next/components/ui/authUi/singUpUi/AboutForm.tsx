'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/(site)/context/ProgressContext';

export default function AboutPage() {
  const router = useRouter();
	const { setStep } = useProgress();
  const [name, setName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');
  const [progressWidth, setProgressWidth] = useState("w-0");

  const isValid = name.trim().length > 0;

  useEffect(() => {
		setStep(2);
    const timer = setTimeout(() => {
      setProgressWidth("w-2/3");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (isValid) {
      console.log({ name, birthDay, birthMonth, birthYear, gender });
      router.push('/sign-up/finish');
    }
  };

  return (
    <div className="flex justify-center bg-black text-white min-h-screen">
      <div className="w-full max-w-md px-8 py-4">

        <p className="text-base text-gray-400 mb-1">Step 2 of 3</p>
        <h2 className="text-[15px] font-bold mb-4">Tell us about yourself</h2>

        <label className="text-sm font-semibold block mb-2">Name</label>
        <input
          type="text"
          className="w-full bg-black border border-gray-600 text-white p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="This name will show on your profile"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="text-sm font-semibold block mb-2">Date of Birth</label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="DD"
            className="w-1/3 p-3 rounded-md bg-black border border-gray-600 text-white"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          />
          <select
            className="w-1/3 p-3 rounded-md bg-black border border-gray-600 text-white"
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
          >
            <option value="">Month</option>
            {[
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ].map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="YYYY"
            className="w-1/3 p-3 rounded-md bg-black border border-gray-600 text-white"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
        </div>

        <label className="text-sm font-semibold block mb-2">Gender</label>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to say'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setGender(option)}
              className={clsx(
                'border rounded-md px-4 py-2 text-sm',
                gender === option
                  ? 'border-green-500 text-white bg-green-600'
                  : 'border-gray-600 text-gray-300'
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          disabled={!isValid}
          onClick={handleNext}
          className={clsx(
            'w-full text-center font-bold py-3 px-4 rounded-full transition',
            isValid
              ? 'bg-green-500 hover:bg-green-600 text-black'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          )}
        >
          Next
        </button>

        <p className="text-xs text-gray-500 mt-6 text-center">
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="#" className="underline">Privacy Policy</a> and{' '}
          <a href="#" className="underline">Terms of Service</a> apply.
        </p>
      </div>
    </div>
  );
}
