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
    "px-1 py-1 md:px-2 rounded-xl font-bold font-nunito transition-colors duration-500 hover:scale-[1.1] transition-transform";

  const styles = classNames(base, className, {
    "border-2 border-gray-400 dark:border-sky-900 bg-gradient-to-r from-cyan-500 to-blue-700":
      variant === "primary",
    "border-2 border-gray-400 bg-red-400 text-white hover:bg-red-600":
      variant === "danger",
    "border-2 border-cyan-700 dark:border-cyan-600 bg-gray-600 dark:bg-gray-200 text-gray-200 dark:text-gray-800 hover:bg-gray-500 hover:dark:bg-gray-300":
      variant === "secondary",
  });

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;
