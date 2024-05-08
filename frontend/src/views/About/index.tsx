import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col md:flex-row md:w-3/4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <div className="relative text-white font-bold text-4xl">
            {t("about")}
          </div>
          <div className="relative text-white text-2xl">
            {t("about_description")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
