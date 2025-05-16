import { ChangeEvent } from "react";

interface DateInputProps {
  inputId: string;
  value: string;
  placeholder: string;
  onClick: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function DateInput({ inputId, value, placeholder, onClick, onChange }: DateInputProps) {
  return (
    <input
      id={inputId}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onClick={onClick}
      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
