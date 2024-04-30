import { useTranslation } from "react-i18next";
import Nav from "./nav";
import InputTranslate from "./ExecuteTranslate";
const Translate = () => {
  const { t } = useTranslation();

  return (
    <>
      <Nav /> {Nav}
      <InputTranslate /> {InputTranslate}
      {t}
    </>
  );
};

export default Translate;
