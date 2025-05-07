import React, { useRef, useEffect, useState } from "react";

type FormatOption = {
  label: string;
  command: string;
  value?: string;
};

type RichTextareaProps = {
  placeholder?: string;
  disabled?: boolean;
  initialContent?: string;
  onChange?: (content: string) => void;
  buttons?: FormatOption[];
};

export const RichTextarea: React.FC<RichTextareaProps> = ({
  placeholder = "Skriv här...",
  disabled = false,
  initialContent = "",
  onChange,
  buttons = [
    { label: "B", command: "bold" },
    { label: "I", command: "italic" },
    { label: "U", command: "underline" },
    { label: "❌", command: "removeFormat" },
  ],
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeCommands, setActiveCommands] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState("3");
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  const updateActiveCommands = () => {
    const active: string[] = [];
    buttons.forEach((btn) => {
      if (document.queryCommandState(btn.command)) {
        active.push(btn.command);
      }
    });
    setActiveCommands(active);
  };

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleChange();
    updateActiveCommands();
  };

  const handleChange = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleSelectionChange = () => {
    updateActiveCommands();
  };

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    setFontSize(size);
    handleFormat("fontSize", size);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    handleFormat("foreColor", newColor);
  };

  return (
    <div className="w-full max-w-md space-y-2 border p-4 rounded-md bg-white">
      {/* Toolbar */}
      <div className="flex gap-2 flex-wrap items-center">
        {/* Format Buttons */}
        {buttons.map((btn, index) => {
          const isActive = activeCommands.includes(btn.command);
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleFormat(btn.command, btn.value)}
              className={`px-2 py-1 text-sm border rounded ${
                isActive ? "bg-gray-300" : "hover:bg-gray-100"
              }`}
            >
              {btn.label}
            </button>
          );
        })}

        {/* Font Size Dropdown */}
        <select
          value={fontSize}
          onChange={handleFontSizeChange}
          className="px-2 py-1 text-sm border rounded"
        >
          <option value="1">Textstorlek 1</option>
          <option value="2">Textstorlek 2</option>
          <option value="3">Textstorlek 3</option>
          <option value="4">Textstorlek 4</option>
          <option value="5">Textstorlek 5</option>
          <option value="6">Textstorlek 6</option>
          <option value="7">Textstorlek 7</option>
        </select>

        {/* Color Picker */}
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-8 h-8 border rounded"
          title="Textfärg"
        />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        onInput={() => {
          handleChange();
          updateActiveCommands();
        }}
        className={`min-h-[150px] p-2 border rounded-md focus:outline-none ${
          disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
        }`}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
    </div>
  );
};
