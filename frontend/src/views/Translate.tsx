import { useTranslation } from "react-i18next";

const Translate = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>Translate AI</h1>
      <h2>best translate app ever</h2>
      {t("welcome_message")}
    </>
  );
};

export default Translate;
