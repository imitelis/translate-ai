import { Button } from "@material-tailwind/react";

type SelectHandler = (endpoint: string) => void;

interface TranslationSelectorProps {
  onSelect: SelectHandler;
}

function TranslationSelector({ onSelect }: TranslationSelectorProps) {
  const handleSelect = (endpoint: string) => {
    onSelect(endpoint);
  };

  return (
    <div className="flex justify-center gap-2">
      <Button
        color="purple"
        onClick={() => handleSelect("json")}
        ripple={true}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        JSON
      </Button>
      <Button
        color="orange"
        onClick={() => handleSelect("pytorch")}
        ripple={true}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        PyTorch
      </Button>
      <Button
        color="green"
        onClick={() => handleSelect("deepl")}
        ripple={true}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        DeepL
      </Button>
      <Button
        color="blue-gray"
        onClick={() => handleSelect("geminia")}
        ripple={true}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Geminia
      </Button>
    </div>
  );
}

export default TranslationSelector;
