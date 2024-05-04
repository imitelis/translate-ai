import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { AUTO_LANGUAGE, homologateLanguageByPlatform } from '../../constants';
import { ArrowsIcon } from '../../components/Icons';
import { LanguageSelector } from '../../components/LanguageSelector';
import { SectionType } from '../../types.d';
import { TextArea } from '../../components/TextArea';
import TranslationSelector from "../../components/TranslateSelector";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';


function InputTranslate() {
  const {
    loading,
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
      let requestBody: { text: string, sl?: string, tl?: string }

      switch (selectedEndpoint) {
        case "json":
          url = 'http://127.0.0.1:8000/api/translate/json';
          requestBody = {
            text: fromText,
            sl: fromLanguage,
            tl: toLanguage
          };
          break;
        case "deepl":
          url = 'http://127.0.0.1:8000/api/translate/deepl';
          requestBody = {
            text: fromText,
            sl: fromLanguage,
            tl: homologateLanguage(selectedEndpoint, 'tl', toLanguage)
          };
          break;
        case "geminia":
          url = 'http://127.0.0.1:8000/api/translate/geminia';
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
    <Container fluid className="bg-img d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <h1 className="text-center mb-4 text-light"> </h1>
        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLanguage}
              />
              <TextArea
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}
                className="form-control bg-light text-dark border-0 rounded"
              />
            </Stack>
          </Col>
          <Col xs='auto'>
            <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages} className="text-light">
              <ArrowsIcon />
            </Button>
          </Col>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={setToLanguage}
              />
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
                className="form-control bg-light text-dark border-0 rounded"
              />
            </Stack>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <TranslationSelector onSelect={setSelectedEndpoint} />
            <Button variant="primary" onClick={translateText}>Translate</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default InputTranslate;
