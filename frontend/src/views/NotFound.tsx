import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>NotFound AI</h1>
      <h2 className="bg-red-300">sorry not found</h2>
      {t("welcome_message")}
    </>
  );
};

export default NotFound;
