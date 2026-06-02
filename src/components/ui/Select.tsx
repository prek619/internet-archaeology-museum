import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", id, ...props }, ref) => {
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
        <select
          ref={ref}
          id={inputId}
          className={[
            "h-14 w-full px-4",
            "bg-white border-4 border-black",
            "font-bold text-base text-black",
            "appearance-none cursor-pointer",
            "focus-visible:outline-none focus-visible:bg-neo-secondary focus-visible:shadow-neo-sm",
            "transition-all duration-100",
            error ? "border-neo-accent" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs font-black text-neo-accent uppercase tracking-wider">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
