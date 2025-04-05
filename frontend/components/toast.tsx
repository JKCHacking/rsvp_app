import React, { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
};

const toastColors = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
};

export const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-5 left-5 z-50`}>
      <div
        className={`text-white px-4 py-3 rounded-lg shadow-lg animate-slide-in-left transition-all duration-300 ${toastColors[type]}`}
      >
        {message}
      </div>
    </div>
  );
};
