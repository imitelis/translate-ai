import { useState } from "react";
import { useStore } from "../../hooks/useStore";
import { AUTO_LANGUAGE, homologateLanguageByPlatform } from "../../constants";
import { ArrowsIcon } from "../../components/Icons";
import { LanguageSelector } from "../../components/LanguageSelector";
import { SectionType } from "../../types";
import { TextAreaComponent } from "../../components/TextArea";
import TranslationSelector from "../../components/TranslateSelector";
import axios from "axios";
import { useTranslation } from "react-i18next";

function InputTranslate() {
  const {
    fromLanguage,
    toLanguage,
    interchangeLanguages,
    setToLanguage,
    setFromLanguage,
    fromText,
    result,
    setFromText,
    setResult,
  } = useStore();

  const [selectedEndpoint, setSelectedEndpoint] = useState("json");
  const [texts, setTexts] = useState<string[]>([]);
  const [sentiment, setSentiment] = useState("");
  const { t } = useTranslation();

  const translateText = async () => {
    try {
      let url;
      // const queryParams = `?text=${encodeURIComponent(fromText)}&sl=${encodeURIComponent(fromLanguage)}&tl=${encodeURIComponent(toLanguage)}`;
      let requestBody: { text: string; sl?: string; tl?: string } = {
        text: "",
      }; // Inicializa requestBody como un objeto vacío

      setTexts((prevTexts) => {
        if (
          prevTexts.length > 0 &&
          prevTexts[prevTexts.length - 1] === fromText
        ) {
          return prevTexts;
        } else {
          return [...prevTexts, fromText];
        }
      });

      switch (selectedEndpoint) {
        case "pytorch":
          url = "http://localhost:8000/api/translate/pytorch";
          requestBody = {
            text: fromText,
            sl: fromLanguage,
            tl: homologateLanguage(selectedEndpoint, "tl", toLanguage),
          };
          break;
        case "deepl":
          url = "http://localhost:8000/api/translate/deepl";
          requestBody = {
            text: fromText,
            sl: fromLanguage,
            tl: homologateLanguage(selectedEndpoint, "tl", toLanguage),
          };
          break;
        case "geminia":
          url = "http://localhost:8000/api/translate/geminia";
          requestBody = {
            text: fromText,
            sl: fromLanguage,
            tl: homologateLanguage(selectedEndpoint, "tl", toLanguage),
          };
          break;
        default:
          throw new Error("Invalid endpoint");
      }

      const response = await axios.post(url, requestBody);

      // Actualiza el resultado con la traducción recibida
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sentimentText = async () => {
    try {
      const url = `http://localhost:8000/api/sentiment`;
      const requestBody = {
        translations: [...texts],
      };

      const response = await axios.post(url, requestBody);

      console.log("requests", texts);

      setSentiment(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const translatedSentiment = () => {
    if (sentiment == "neutral") {
      return t("neutral");
    } else if (sentiment == "mostly positive") {
      return t("positive");
    } else if (sentiment == "mostly negative") {
      return t("negative");
    }
  };

  function homologateLanguage(
    platform: "json" | "pytorch" | "deepl" | "geminia",
    direction: "tl" | "sl",
    language: "en" | "es",
  ) {
    if (
      homologateLanguageByPlatform[platform] &&
      homologateLanguageByPlatform[platform][direction] &&
      homologateLanguageByPlatform[platform][direction][language]
    ) {
      return (
        homologateLanguageByPlatform[platform][direction][language] || language
      );
    } else {
      return language;
    }
  }

  return (
    <div className="bg-img flex justify-center items-center min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-center mb-4 text-light"> </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <div className="mt-3">
              <TextAreaComponent
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}
              />
            </div>
          </div>
          <div className="flex items-center justify-center lg:col-span-1">
            <button
              onClick={interchangeLanguages}
              disabled={fromLanguage === AUTO_LANGUAGE}
              className="text-white bg-indigo-400 py-2 px-4 rounded-md"
            >
              <ArrowsIcon />
            </button>
          </div>
          <div>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div className="mt-3">
              <TextAreaComponent
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <TranslationSelector onSelect={setSelectedEndpoint} />
          <div className="mt-6 text-center space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={translateText}
            >
              {t("translate")}
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={sentimentText}
            >
              {t("sentiment")}
            </button>
          </div>
          <div className="mt-6 text-center">
            <div className="text-white text-lg my-2">
              {t("sentiment")}:{" "}
              {sentiment === "" ? (
                <>{t("none_yet")}</>
              ) : (
                <>{translatedSentiment()}</>
              )}
            </div>
            
            <ul className="text-white text-lg mt-2">
              <li>{t("translations")}:</li>
              {texts.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputTranslate;
