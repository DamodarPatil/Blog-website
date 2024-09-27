import { Container, LogoutBtn, Logo } from "../index";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import NavItems from "./NavItems";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { name: "Home", slug: "/", active: true },
      { name: "Login", slug: "/login", active: !authStatus },
      { name: "Signup", slug: "/signup", active: !authStatus },
      { name: "All Posts", slug: "/all-posts", active: authStatus },
      { name: "Add Post", slug: "/add-post", active: authStatus },
    ],
    [authStatus]
  );

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-deepNavy py-6">
      <Container>
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl md:text-3xl text-white font-bold">
            <Logo width="70px" />
          </Link>
          <nav className="hidden md:flex space-x-7">
            <NavItems items={navItems} />
            {authStatus && <LogoutBtn />}
          </nav>
          <button
            className="md:hidden flex items-center focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        {/* Mobile menu */}
        <div
          className={`fixed top-16 right-0 w-[200px] max-w-sm bg-warmGray rounded-lg p-4 transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out shadow-lg z-50`}
        >
          <NavItems items={navItems} closeMobileMenu={closeMobileMenu} />
          {authStatus && <LogoutBtn onClick={closeMobileMenu} />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
