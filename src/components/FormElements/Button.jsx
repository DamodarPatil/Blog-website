import PropTypes from "prop-types";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-softTeal", // Updated default background color
  textColor = "text-white", // Updated default text color
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
