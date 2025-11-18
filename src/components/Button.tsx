import { cn } from "../utils/cn";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "cursor-pointer px-6 py-3 rounded-xl font-medium group relative overflow-hidden transition-all duration-300";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-b from-indigo-500 to-indigo-600 " +
      "shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] border border-slate-500 text-white",

    secondary:
      "bg-gradient-to-b from-gray-400 to-gray-600 " +
      "shadow-[0px_4px_32px_0_rgba(107,114,128,.70)] border border-gray-500 text-white",

    danger:
      "bg-gradient-to-b from-red-500 to-red-700 " +
      "shadow-[0px_4px_32px_0_rgba(239,68,68,.70)] border border-red-600 text-white",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      <div className="relative overflow-hidden">
        <p
          className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]"
        >
          {children}
        </p>

        <p
          className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]"
        >
          {children}
        </p>
      </div>
    </button>
  );
}
