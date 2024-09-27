import { Link } from "react-router-dom";
import { Logo } from "../index";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-warmGray py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Copyright */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <Logo width="120px" />
            </div>
            <p className="text-sm text-mutedGold">
              &copy; {new Date().getFullYear()} DevUI. All rights reserved.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold uppercase tracking-wide text-warmGray">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-warmGray hover:text-coral transition"
                  to="/"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="text-warmGray hover:text-coral transition"
                  to="/"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="text-warmGray hover:text-coral transition"
                  to="/"
                >
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link
                  className="text-warmGray hover:text-coral transition"
                  to="/"
                >
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold uppercase tracking-wide text-warmGray">
              Support
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-warmGray hover:text-coral transition"
                  to="/"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  className="text-warmGray hover:text-coral transition"
                  to="/"
                >
                  Help
                </Link>
              </li>
              <li>
                <Link
                  className="text-warmGray hover:text-coral transition"
                  to="/"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-warmGray hover:text-coral transition"
                  to="/"
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold uppercase tracking-wide text-warmGray">
              Legal
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-warmGray hover:text-coral transition"
                  to="/"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  className="text-warmGray hover:text-coral transition"
                  to="/"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-warmGray hover:text-coral transition"
                  to="/"
                >
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-10 flex justify-center space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mutedGold hover:text-coral"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mutedGold hover:text-coral"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mutedGold hover:text-coral"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
