'use client';

import { InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';
import clsx from 'clsx';

type CustomCheckboxProps = {
  label: ReactNode;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function CustomCheckbox({
  label,
  className,
  ...props
}: CustomCheckboxProps) {
  const id = useId();

  return (
    <label htmlFor={id} className={clsx('flex items-start gap-3 cursor-pointer', className)}>
      <div className="relative ">
        <input
          type="checkbox"
          id={id}
          className="peer hidden"
          {...props}
        />
        <div className="w-5 h-5 border border-gray-600 rounded-sm
                        peer-checked:bg-green-500 peer-checked:border-green-500
                        transition-all duration-200
                        relative
                        after:content-[''] after:absolute after:w-2.5 after:h-1.5 after:left-1 after:top-[6px]
                        after:border-l-2 after:border-b-2 after:rotate-[-45deg] after:opacity-0
                        peer-checked:after:opacity-100 after:border-white" />
      </div>
      <span className="text-sm leading-5 text-white w-[310px]">{label}</span>
    </label>
  );
}
