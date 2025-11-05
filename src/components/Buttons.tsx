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
    "px-1 py-1 md:px-2 rounded-xl font-bold font-oswaldo transition-colors duration-500 hover:scale-[1.1] transition-transform";

  const styles = classNames(base, className, {
    "border-2 border-indigo-400 dark:border-sky-900 bg-gradient-to-r from-cyan-500 to-blue-700 hover:scale-[1.1] text-white":
      variant === "primary",
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
