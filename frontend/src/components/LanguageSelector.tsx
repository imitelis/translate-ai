import { SUPPORTED_LANGUAGES, AUTO_LANGUAGE } from "../constants";
import { type FromLanguage, type Language, SectionType } from "../types";

type Props =
  | {
      type: SectionType.From;
      value: FromLanguage;
      onChange: (Language: FromLanguage) => void;
    }
  | {
      type: SectionType.To;
      value: Language;
      onChange: (Language: Language) => void;
    };

export const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };

  return (
    <div className="relative">
      <select
        onChange={handleChange}
        value={value}
        className={`block appearance-none w-full bg-gradient-to-r from-blue-300 via-blue-700 to-purple-500 border border-gray-100 text-black py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-semibold`}
      >
        {type == SectionType.From && (
          <option value={AUTO_LANGUAGE}>Selecciona el Idioma</option>
        )}
        {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
          <option key={key} value={key}>
            {literal}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 0 1 1.414 1.414L10 10.414l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};
