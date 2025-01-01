import React from "react";

type ButtonProps = {
    text: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    type?: 'submit' | 'button'
};

const Button: React.FC<ButtonProps> = ({ text, onClick = () => { }, variant = 'primary', disabled = false, type = 'button' }) => {
    const baseClassName = `px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`;
    const variantClassName = variant === "primary" ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300" : "bg-gray-500 hover:bg-gray-600 focus:ring-gray-300";
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={` ${baseClassName} ${variantClassName} `}
            type={type}
        >
            {text}
        </button>
    )
};

export default Button;
