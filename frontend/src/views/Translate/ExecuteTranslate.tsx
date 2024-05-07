import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { AUTO_LANGUAGE, homologateLanguageByPlatform } from '../../constants';
import { ArrowsIcon } from '../../components/Icons';
import { LanguageSelector } from '../../components/LanguageSelector';
import { SectionType } from '../../types.d';
import { TextAreaComponent } from '../../components/TextArea';
import TranslationSelector from "../../components/TranslateSelector";
import axios from 'axios';

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
    setResult
  } = useStore();

  const [selectedEndpoint, setSelectedEndpoint] = useState("json");

  const translateText = async () => {
    try {
      let url;
      let queryParams = `?text=${encodeURIComponent(fromText)}&sl=${encodeURIComponent(fromLanguage)}&tl=${encodeURIComponent(toLanguage)}`;
      let requestBody: { text: string, sl?: string, tl?: string } = {
        text: ''
      }; // Inicializa requestBody como un objeto vacío
  
      switch (selectedEndpoint) {
        case "json":
          url = `http://localhost:8000/api/translate/json${queryParams}`;
          break;
        case "deepl":
          url = 'http://localhost:8000/api/translate/deepl';
          requestBody = {
            text: fromText,
            sl: fromLanguage,
            tl: homologateLanguage(selectedEndpoint, 'tl', toLanguage)
          };
          break;
        case "geminia":
          url = 'http://localhost:8000/api/translate/geminia';
          requestBody = {
            text: fromText,
            sl: fromLanguage,
            tl: homologateLanguage(selectedEndpoint, 'tl', toLanguage)
          };
          break;
        default:
          throw new Error("Invalid endpoint");
      }
  
      const response = await axios.post(url, requestBody);
  
      // Actualiza el resultado con la traducción recibida
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  function homologateLanguage(platform: 'json' | 'deepl' | 'geminia', direction: 'tl' | 'sl', language: 'en' | 'es') {

    if (homologateLanguageByPlatform[platform] && homologateLanguageByPlatform[platform][direction] && homologateLanguageByPlatform[platform][direction][language]) {
      return homologateLanguageByPlatform[platform][direction][language] || language;

    }
    else {
      return language
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
            <div className='mt-3'>
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
              className="text-light"
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
            <div className='mt-3'>

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
          <div className='mt-6 text-center'>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={translateText}
            >
              Translate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputTranslate;
