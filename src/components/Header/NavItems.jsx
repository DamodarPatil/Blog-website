import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const NavItems = ({ items, closeMobileMenu }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (slug) => {
    navigate(slug);
    if (closeMobileMenu) {
      closeMobileMenu(); // Close menu on mobile when navigating
    }
  };

  const handleResize = () => {
    // Assuming 768px is the breakpoint for mobile
    if (window.innerWidth > 768) {
      setIsMobileMenuOpen(false);
      if (closeMobileMenu) {
        closeMobileMenu(); // Close menu when resizing to desktop
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <ul
      className={`flex flex-col space-y-4 ${
        isMobileMenuOpen ? "md:hidden" : "md:flex-row md:space-x-7 md:space-y-0"
      } p-4 md:p-0`}
    >
      {items
        .filter((item) => item.active)
        .map((item) => (
          <li key={item.name}>
            <button
              onClick={() => handleNavigation(item.slug)}
              className="block w-full text-left md:inline-block px-6 md:py-3 py-1 text-[#C96868] bg-[#FFF4EA] rounded-lg font-semibold hover:bg-[#FADFA1] hover:text-white transition duration-300 ease-in-out"
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
  closeMobileMenu: PropTypes.func,
};

export default NavItems;
