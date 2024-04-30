import { useState, ChangeEvent } from "react";
import { Textarea } from "@material-tailwind/react";

export default function InputTranslate() {
    const [inputValue, setInputValue] = useState("");
    const [translationValue, setTranslationValue] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        // Simulamos la traducción copiando el texto ingresado
        setTranslationValue(newValue);
    };

    const calculateTextareaHeight = (value: string) => {
        const maxHeight = 250; // Altura máxima deseada
        const lines = value.split('\n').length;
        return Math.min(lines * 20, maxHeight);
    };

    const inputLength = inputValue.length;
    const translationLength = translationValue.length;

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col md:flex-row md:w-1/2">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <div className="relative">
                        <Textarea
                            color="teal"
                            label="Ingresa Texto"
                            className="rounded-lg px-4 py-2 border border-gray-300 w-full focus:outline-none focus:border-teal-500"
                            value={inputValue}
                            onChange={handleInputChange}
                            style={{ height: `${calculateTextareaHeight(inputValue)}px` }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                        {inputLength > 0 && (
                            <span className={`absolute right-5 bottom-3 ${inputLength >= 5000 ? 'text-red-500 text-sm' : 'text-gray-400 text-sm'}`}>{inputLength}/5000</span>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 ml-0 md:ml-4">
                    <div className="relative">
                        <Textarea
                            color="teal"
                            label="Traducción"
                            className="rounded-lg px-4 py-2 border border-gray-300 w-full focus:outline-none focus:border-teal-500"
                            value={translationValue}
                            onChange={() => { }} // No permitimos cambios directos en la traducción
                            style={{ height: `${calculateTextareaHeight(translationValue)}px` }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                        {translationLength > 0 && (
                            <span className={`absolute right-5 bottom-3 ${translationLength >= 5000 ? 'text-red-500 text-sm' : 'text-gray-400 text-sm'}`}>{translationLength}/5000</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
