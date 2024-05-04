import  { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

// Define el tipo de función para onSelect
type SelectHandler = (endpoint: string) => void;

interface TranslationSelectorProps {
  onSelect: SelectHandler; // Especifica el tipo de función para onSelect
}

function TranslationSelector({ onSelect }: TranslationSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelect = (endpoint: string) => {
    setSelectedOption(endpoint);
    onSelect(endpoint);
  };

  return (
    <ButtonGroup>
      <Button
        onClick={() => handleSelect("json")}
        variant={selectedOption === "json" ? "primary" : "secondary"} // Resalta si es la opción seleccionada
      >
        Model
      </Button>
      <Button
        onClick={() => handleSelect("deepl")}
        variant={selectedOption === "deepl" ? "primary" : "secondary"} // Resalta si es la opción seleccionada
      >
        DeepL
      </Button>
      <Button
        onClick={() => handleSelect("geminia")}
        variant={selectedOption === "geminia" ? "primary" : "secondary"} // Resalta si es la opción seleccionada
      >
        Geminia
      </Button>
    </ButtonGroup>
  );
}

export default TranslationSelector;

