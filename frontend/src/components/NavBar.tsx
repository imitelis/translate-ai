import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


import logo from "../assets/Logo.png";

const NavBar = ({ path, language }) => {
  const [nav, setNav] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };
  
  const handleSelectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value
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
      <a href="/" className="flex items-center justify-center">
        <img
          className="ml-10 mx-auto rounded-full py-8 md:py-0"
          src={logo}
          width={70}
          alt="Logo"
        />
        <h1 className="ml-5 uppercase font-black text-lg lg:text-xl tracking-wide">
          TRANSLATE AI
        </h1>
      </a>

      {/* Menú para dispositivos móviles */}
      <div className="md:hidden mr-10">
        <div onClick={handleNav} className="text-gray-300 cursor-pointer">
          {nav ? (
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
          className={`absolute top-24 right-0 w-full bg-blue-500 text-white py-4 ${nav ? "" : "hidden"}`}
        >
          <ul className="flex flex-col items-center gap-4">
            <li>
              <ScrollLink
                to="about"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                onClick={handleNav}
                className="hover:text-green-500 transition-colors duration-300"
              >
                About
              </ScrollLink>
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
              About
            </ScrollLink>
          </li>
          <li>
          <select value={selectedOption} onChange={handleSelectLanguage}>
        <option value="es">Espanol</option>
        <option value="en">English</option>
      </select>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
