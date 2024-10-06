import React from "react";

type ButtonProps = {
    text:string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', disabled = false, className }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {text}
        </button>
    )
};

export default Button;