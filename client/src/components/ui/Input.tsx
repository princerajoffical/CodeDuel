import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", type = "text", ...props }, ref) => {
    return (
      <div className="w-full text-left space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary font-sans">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={type}
            className={`w-full rounded-xl border border-border-primary bg-bg-primary px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 ${
              error ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" : ""
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1 duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;