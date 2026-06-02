import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = "", id, rows = 4, ...props }, ref) => {
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
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={[
            "w-full px-4 py-3",
            "bg-white border-4 border-black",
            "font-bold text-base text-black",
            "placeholder:text-black/40",
            "focus-visible:outline-none focus-visible:bg-neo-secondary focus-visible:shadow-neo-sm",
            "transition-all duration-100 resize-none",
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

Textarea.displayName = "Textarea";
export default Textarea;
