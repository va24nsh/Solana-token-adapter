import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <label
          className="text-sm font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 focus:outline-none focus:ring-2 bg-transparent ${className}`}
        style={{
          borderRadius: "calc(var(--radius) * 0.7)",
          border: "1px solid var(--color-secondary)",
          background: "var(--color-card-dark)",
          color: "var(--color-text)",
        }}
        {...props}
      />
      {error && (
        <p style={{ color: "var(--color-danger-dark)" }} className="text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
