import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  show: boolean;
  toggleShow: () => void;
  name: string;
}

export default function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  show,
  toggleShow,
  name,
}: Props) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type={show ? 'password' : 'text'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full p-3 pr-10 rounded-md border border-gray-600 bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          tabIndex={-1}
        >
          {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
    </div>
  );
}
