import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div
      className={`w-full max-w-md p-6 shadow ${className}`}
      style={{
        background: "var(--color-card-dark)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        color: "var(--color-text)",
      }}
    >
      {title && (
        <h2
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Card;
