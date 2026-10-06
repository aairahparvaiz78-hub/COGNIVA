import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Brain, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setOpen(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/#features" },
    { name: "How It Works", path: "/#how-it-works" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">
            <Brain size={21} />
          </span>
          <span className="brand-text">
            Cogni<span>va</span>
          </span>
        </Link>

        <div className={`nav-links ${open ? "mobile-open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className={location.pathname === link.path ? "active" : ""}
            >
              {link.name}
            </Link>
          ))}

          <div className="mobile-actions">
            <Link to="/login" className="nav-login" onClick={closeMenu}>
              Login
            </Link>

            <Link
              to="/signup"
              className="primary-btn nav-signup"
              onClick={closeMenu}
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="navbar-actions">
          <Link to="/login" className="nav-login">
            Login
          </Link>

          <Link to="/signup" className="primary-btn nav-signup">
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}