import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col md:flex-row md:w-1/2">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <div className="relative text-white font-bold text-4xl">
            {t("error_not_found")}
          </div>
          <div className="relative text-white text-2xl">
            {t("sorry_not_found")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
