import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  className,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 font-semibold focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantStyles = {
    primary:
      "bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] text-white",
    secondary: "bg-[var(--color-secondary)] hover:bg-gray-700 text-white",
    danger:
      "bg-[var(--color-danger-dark)] hover:bg-[var(--color-danger)] text-white",
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        rounded-[var(--radius)]
        shadow
        ${className}
      `}
      style={{
        boxShadow: "var(--shadow)",
        borderRadius: "var(--radius)",
      }}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
