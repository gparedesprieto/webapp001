import React, { useState } from "react";

interface AutocompleteProps {
  suggestions: string[];
  onSelect: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    const filtered = suggestions.filter((s) =>
      s.toLowerCase().includes(userInput.toLowerCase())
    );
    setInputValue(userInput);
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    setShowSuggestions(false);
    onSelect(value);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        value={inputValue}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        onFocus={() => inputValue && setShowSuggestions(true)}
        placeholder="Escribe para buscar..."
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-auto">
          {filteredSuggestions.map((s, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => handleSelect(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
