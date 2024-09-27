import { forwardRef, useId } from "react";
import PropTypes from "prop-types";

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
        className={`px-2 py-2 rounded-lg bg-[#FFF4EA] outline-none focus:bg-[#FADFA1]
            duration-200 border border-[#C96868] w-full ${className}`}
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

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default forwardRef(Select);
