import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import logo from "../assets/Logo.png";

interface NavigationBarProps {
  path: string;
  language: string;
}

const NavigationBar = ({ path, language }: NavigationBarProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // const [selectedOption, setSelectedOption] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleSelectLanguage = (newLanguage: string) => {
    if (newLanguage != language) {
      // console.log('new lang', newLanguage)
      const newPath = path.includes(language)
        ? path.replace(`/${language}`, `/${newLanguage}`)
        : path.endsWith("/")
          ? `${path}${newLanguage}`
          : `${path}/${newLanguage}`;

      navigate(newPath, { replace: true });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-full fixed top-0 left-0 text-white shadow-lg flex justify-between items-center h-24 ">
      <Link to="/" className="flex items-center justify-center">
        <img
          className="ml-10 mx-auto rounded-full py-8 md:py-0"
          src={logo}
          width={70}
          alt="Logo"
        />
        <h1 className="ml-5 uppercase font-black text-lg lg:text-xl tracking-wide">
          {t("translate_ai")}
        </h1>
      </Link>

      {/* Menú para dispositivos móviles */}
      <div className="md:hidden mr-10">
        <div
          onClick={handleMobileMenu}
          className="text-gray-300 cursor-pointer"
        >
          {showMobileMenu ? (
            <AiOutlineClose
              size={30}
              className="transition-transform duration-300 transform hover:scale-110"
            />
          ) : (
            <AiOutlineMenu
              size={30}
              className="transition-transform duration-300 transform hover:scale-110"
            />
          )}
        </div>
        {/* Menú desplegable */}
        <div
          className={`absolute top-24 right-0 w-full bg-blue-500 text-white py-4 ${showMobileMenu ? "" : "hidden"}`}
        >
          <ul className="flex flex-col items-center gap-4">
            <li>
              <ScrollLink
                to="about"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                onClick={handleMobileMenu}
                className="hover:text-green-500 transition-colors duration-300"
              >
                <Link to={`about/${language}`}>{t("about")}</Link>
              </ScrollLink>
            </li>
            <li>
              <select
                onChange={(e) => handleSelectLanguage(e.target.value)}
                value={language}
                className="text-2xl lg:text-xl font-medium p-2.5 lg:p-2 bg-indigo-400 hover:bg-indigo-500 transition-colors duration-300 text-white shadow-md rounded-lg"
              >
                <option value="en" className="text-sm">
                  English
                </option>
                <option value="es" className="text-sm">
                  Espanol
                </option>
              </select>
            </li>
          </ul>
        </div>
      </div>

      {/* Menú para pantallas medianas y grandes */}
      <div className="font-semibold text-base lg:text-lg hidden md:block mr-20">
        <ul className="mx-auto flex items-center gap-6 lg:gap-8 cursor-pointer justify-center">
          <li>
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              className="hover:text-green-500 transition-colors duration-300"
            >
              <Link to={`about/${language}`}>{t("about")}</Link>
            </ScrollLink>
          </li>
          <li>
            <select
              onChange={(e) => handleSelectLanguage(e.target.value)}
              value={language}
              className="text-2xl lg:text-xl font-medium p-2.5 lg:p-2 bg-indigo-400 hover:bg-indigo-500 transition-colors duration-300 text-white shadow-md rounded-lg"
            >
              <option value="en" className="text-sm">
                English
              </option>
              <option value="es" className="text-sm">
                Espanol
              </option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
