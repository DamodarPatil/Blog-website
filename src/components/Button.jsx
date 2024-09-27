import PropTypes from "prop-types";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-[#C96868]", // Default background color from your palette
  textColor = "text-[#FFF4EA]", // Default text color from your palette
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg
            ${bgColor}
            ${textColor}
            ${className}
            `}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
