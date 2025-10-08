import React from "react";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
}

const typeStyles = {
  success: {
    background: "#14532d",
    color: "#bbf7d0",
  },
  error: {
    background: "var(--color-danger-dark)",
    color: "#fff",
  },
  warning: {
    background: "#78350f",
    color: "#fde68a",
  },
  info: {
    background: "var(--color-primary-dark)",
    color: "#fff",
  },
};

const Alert: React.FC<AlertProps> = ({ type = "info", message }) => {
  return (
    <div
      className="p-3 text-sm font-medium"
      style={{
        borderRadius: "calc(var(--radius) * 0.7)",
        background: typeStyles[type].background,
        color: typeStyles[type].color,
        boxShadow: "var(--shadow)",
      }}
    >
      {message}
    </div>
  );
};

export default Alert;
