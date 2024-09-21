import { Container, LogoutBtn, Logo } from "../index";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import NavItems from "./NavItems";
import { Link } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = useMemo(
    () => [
      {
        name: "Home",
        slug: "/",
        active: true,
      },
      {
        name: "Login",
        slug: "/login",
        active: !authStatus,
      },
      {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
      },
      {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
      },
      {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
      },
    ],
    [authStatus]
  );

  return (
    <header>
      <Container>
        <nav className="">
          <div className="">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            <NavItems items={navItems} />
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
