'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import clsx from 'clsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function PasswordForm() {
	const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
	const [progressWidth, setProgressWidth] = useState("w-0");

  const { hasLetter, hasNumberOrSymbol, isMinLength } = validatePassword(password);
  const allValid = hasLetter && hasNumberOrSymbol && isMinLength;

	const handleNext = () => {
    if (allValid) {
      console.log('Пароль:', password); 
      router.push('/sign-up/about');
    }
  };


	useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth("w-1/3"); 
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-white text-left">

      <p className="text-sm text-gray-400 mb-2">Step 1 of 3</p>
      <h2 className="text-[15px] font-bold mb-4">Create a password</h2>

      <label className="text-sm font-semibold block mb-2">Password</label>
      <div className="relative mb-4">
        <input
          type={showPassword ? 'password' : 'text'}
          className="w-full bg-black border border-gray-600 text-white p-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
        >
        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>

      <p className="text-sm font-semibold mb-2">Password requirements:</p>
      <ul className="text-sm space-y-2 mb-6">
        <RequirementItem label="1 letter" checked={hasLetter} />
        <RequirementItem
          label="1 number or 1 special character ( # ? ! &)"
          checked={hasNumberOrSymbol}
        />
        <RequirementItem label="10 characters" checked={isMinLength} />
      </ul>

      <button
        disabled={!allValid}
				onClick={handleNext}
        className={clsx(
          'w-full text-center font-bold py-3 px-4 rounded-full transition',
          allValid
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
  );
}

function RequirementItem({ label, checked }: { label: string; checked: boolean }) {
  const Icon = checked ? CheckCircle : Circle;
  return (
    <li className="flex items-center gap-2">
      <Icon size={18} className={checked ? 'text-green-500' : 'text-gray-500'} />
      <span className={checked ? 'text-white' : 'text-gray-400'}>{label}</span>
    </li>
  );
}

function validatePassword(password: string) {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumberOrSymbol = /[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const isMinLength = password.length >= 10;
  return { hasLetter, hasNumberOrSymbol, isMinLength };
}
