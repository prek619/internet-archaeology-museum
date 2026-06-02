import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-black uppercase tracking-widest text-black"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            "h-14 w-full px-4",
            "bg-white border-4 border-black",
            "font-bold text-lg text-black",
            "placeholder:text-black/40",
            "focus-visible:outline-none focus-visible:bg-neo-secondary focus-visible:shadow-neo-sm",
            "transition-all duration-100",
            error ? "border-neo-accent bg-neo-accent/10" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs font-bold text-black/60 uppercase tracking-wider">
            {hint}
          </p>
        )}
        {error && (
          <p className="text-xs font-black text-neo-accent uppercase tracking-wider">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
