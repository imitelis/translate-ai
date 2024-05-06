import { Textarea } from "@material-tailwind/react";
import { SectionType } from '../types.d';
import { useState } from 'react';

interface Props {
  type: SectionType;
  onChange: (value: string) => void;
  value: string;
}

const getPlaceholder = ({ type }: { type: SectionType }) => {
  if (type === SectionType.From) return 'Introduzca el texto';
  return 'Traducción';
};

export const TextAreaComponent = ({ type, value, onChange }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="relative">
      <Textarea
        autoFocus={type === SectionType.From}
        disabled={undefined}
        placeholder={getPlaceholder({ type })}
        className={`border border-gray-300 rounded-lg p-3 ${isFocused ? 'border-blue-500' : 'focus:border-blue-500'} ${isFocused ? 'ring-1 ring-blue-500' : ''} text-white w-full h-40 `}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      />

      {type === SectionType.To && (
        <button
          onClick={handleCopy}
          className="absolute top-1 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V3zm2 2v1h6V5H7zm6 2V6H7v1h6zm-1 2v1H8v-1h4zm-2 3v1H8v-1h4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
