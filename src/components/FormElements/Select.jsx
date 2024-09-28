import { forwardRef, useId } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-2 py-2 rounded-lg bg-warmGray outline-none focus:bg-mutedGold
            duration-200 border border-deepNavy w-full ${className}`}
      >
        {options?.map((index, optionValue) => (
          <option key={index} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </div>
  );
};



export default forwardRef(Select);
