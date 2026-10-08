import { useEffect, useRef, useState } from "react";

const Autocomplete = ({
  options,
  placeholder = "Search...",
  onSelect,
}) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  // Search with debounce
  useEffect(() => {
    clearTimeout(debounceRef.current);

    if (!value.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );

      setSuggestions(filtered);
      setIsOpen(true);
      setActiveIndex(-1);
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [value, options]);

  // Outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setValue(option);
    setIsOpen(false);
    setActiveIndex(-1);

    if (onSelect) {
      onSelect(option);
    }
  };

  const handleKeyDown = (event) => {
    if (!isOpen) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (activeIndex >= 0) {
        handleSelect(suggestions[activeIndex]);
      }
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const highlightText = (text) => {
    if (!value) return text;

    const regex = new RegExp(`(${value})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === value.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      )
    );
  };

  return (
    <div className="autocomplete" ref={containerRef}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => {
          if (value.trim()) {
            setIsOpen(true);
          }
        }}
        onKeyDown={handleKeyDown}
      />

      {isOpen && (
        <div className="suggestions">
          {suggestions.length > 0 ? (
            suggestions.map((option, index) => (
              <div
                key={option}
                className={`suggestion ${
                  activeIndex === index ? "active" : ""
                }`}
                onMouseDown={() => handleSelect(option)}
              >
                {highlightText(option)}
              </div>
            ))
          ) : (
            <div className="no-results">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;