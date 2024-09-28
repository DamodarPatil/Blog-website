// ../components/Input.jsx
import { forwardRef, useId } from "react";

const Input = (
  { label, type = "text", className = "", error, ...props },
  ref
) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-2 py-2 rounded-lg bg-warmGray outline-none focus:bg-mutedGold
          duration-200 border w-full ${
            error ? "border-red-600" : "border-deepNavy"
          } ${className}`}
        ref={ref}
        {...props}
        id={id}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-600 mt-1 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};



export default forwardRef(Input);
