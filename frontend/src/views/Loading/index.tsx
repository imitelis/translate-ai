import { useTranslation } from "react-i18next";

const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col md:flex-row md:w-1/2">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <div className="relative text-white font-bold text-4xl">
            {t("loading")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;