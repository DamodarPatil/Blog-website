import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NavItems = ({ items }) => {
  const navigate = useNavigate();
  return (
    <ul>
      {items
        .filter((item) => item.active)
        .map((item) => (
          <li key={item.name}>
            <button
              onClick={() => navigate(item.slug)}
              className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
            >
              {item.name}
            </button>
          </li>
        ))}
    </ul>
  );
};

NavItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default NavItems;
