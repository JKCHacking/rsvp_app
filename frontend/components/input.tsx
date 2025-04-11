import React from "react";

interface InputProps {
    label?: string;
    value?: string;
    placeHolder?: string;
    error?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    type?: string;
}

const Input: React.FC<InputProps> = ({ label, value, placeHolder, error, type, onChange, required = false }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1 gap-2">
                {label}{required && (<label className="italic text-red-500">*</label>)}
            </label>
            <input
                className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
                `}
                value={value}
                placeholder={placeHolder}
                onChange={handleChange}
                type={type}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

export default Input;
