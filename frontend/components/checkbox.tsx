import React, { FC } from "react";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked, onChange, disabled = false }) => {
    return (
        <label
            className={`flex items-center space-x-2 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{label}</span>
        </label>
    );
};

export default Checkbox;
