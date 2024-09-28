import { forwardRef, useId } from "react";

const Input = ({ label, type = "text", className = "", ...props }, ref) => {
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
            duration-200 border border-deepNavy w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
};



export default forwardRef(Input);
