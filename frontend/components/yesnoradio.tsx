import React, { useState } from "react";

interface YesNoRadioProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (value: boolean) => void;
  required?: boolean;
}

const YesNoRadio: React.FC<YesNoRadioProps> = ({ label, name, value, onChange, required = false }) => {
  const yes = "Yes";
  const no = "No";
  
  const [selected, setSelected] = useState<string>(no || "");

  const handleChange = (newValue: string) => {
    setSelected(newValue);
    if (onChange) {
      onChange(newValue == yes);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 mb-1">
        {label}{required && (<label className="italic text-red-500">*</label>)}
      </label>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 mb-1">
          <input
            type="radio"
            name={name}
            value={yes}
            checked={selected === yes}
            onChange={() => handleChange(yes)}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          Yes
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 mb-1">
          <input
            type="radio"
            name={name}
            value={no}
            checked={selected === no}
            onChange={() => handleChange(no)}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          No
        </label>
      </div>
    </div>
  );
};

export default YesNoRadio;