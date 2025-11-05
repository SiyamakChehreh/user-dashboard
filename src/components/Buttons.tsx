import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const base =
    "px-4 py-2 rounded font-semibold font-oswaldo transition-colors duration-500 hover:scale-[1.1] transition-transform";

  const styles = classNames(base, className, {
    "bg-blue-500 text-white hover:bg-blue-600": variant === "primary",
    "bg-red-500 text-white hover:bg-red-600": variant === "danger",
    "bg-gray-200 text-gray-800 hover:bg-gray-300": variant === "secondary",
  });

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;
