'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type FormData = z.infer<typeof schema>;

export default function EmailForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
		localStorage.setItem("signup_email", data.email);
    router.push('/sign-up/password');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-left">
      <label className="text-sm font-semibold mb-2 block">Email address</label>
      <input
        type="email"
        placeholder="name@domain.com"
        {...register('email')}
        className="w-full p-3 rounded-md border border-gray-600 bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
      )}
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-full mt-4"
      >
				Next
      </button>
    </form>
  );
}
