

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import logoImg from "../assets/logo.jpg";
import { AuthContext } from "../context/AuthContext";

const navigation = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Campaign", path: "/campaign" },
  { name: "Help", path: "/contact" },
  { name: "Login", path: "/login" },
];

const Navbar = () => {
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const { isAuthenticated, logout } = useContext(AuthContext);  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    
    navigate("/login");
  };

  const toggleNavbar = () => {
    setIsNavbarActive(!isNavbarActive);
  };

  const toggleDropdown = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  return (
    <section>
      <header>
        <div className="container">
          <nav
            className="navbar has-background-black px-6 py-3"
            role="navigation"
            aria-label="main navigation"
          >
            {/* Navbar Brand (Left Side) */}
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                <img
                  src={logoImg}
                  alt="Company Logo"
                  style={{ width: "70px", height: "70px" }}
                />
                
              </Link>

              

              {/* Mobile Search Box (Optional) */}
              <div className="navbar-item is-hidden-tablet">
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      type="text"
                      className="input"
                      placeholder="Search here"
                    />
                    <span className="icon is-small is-left">
                      <IoSearchOutline className="is-size-4 has-text-white" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Navbar Burger (visible only on mobile) */}
              <button
                type="button"
                className={`navbar-burger burger is-hidden-tablet ${
                  isNavbarActive ? "is-active" : ""
                }`}
                aria-label="menu"
                aria-expanded={isNavbarActive ? "true" : "false"}
                onClick={toggleNavbar}
              >
                <span aria-hidden="true" style={{ background: "white" }}></span>
                <span aria-hidden="true" style={{ background: "white" }}></span>
                <span aria-hidden="true" style={{ background: "white" }}></span>
              </button>
            </div>

            {/* Navbar Menu */}
            <div className={`navbar-menu ${isNavbarActive ? "is-active" : ""}`}>
              {/* Desktop Navigation (Left Side) */}
              <div className="navbar-start is-hidden-touch">
                {navigation.slice(0, 4).map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="navbar-item has-text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Desktop Right Side */}
              <div className="navbar-end is-hidden-touch">
                <div className="navbar-item">
                  {isAuthenticated ? (
                    <>
                      <button
                        className="button  ml-2 is-size-"
                        onClick={() => navigate("/kyc-form")}
                      >
                        KYC Complete
                      </button>

                      <button className="button" onClick={handleLogout}>
                        Logout
                      </button>
                    </>
                  ) : (
                    // If not authenticated, show a dropdown for login/register actions
                    <div
                      className={`dropdown ${
                        isDropdownActive ? "is-active" : ""
                      }`}
                    >
                      <div className="dropdown-trigger">
                        <button
                          className="button"
                          aria-haspopup="true"
                          aria-controls="dropdown-menu"
                          onClick={toggleDropdown}
                        >
                          <span>Register/Login</span>
                          <span className="icon is-small">
                            <i
                              className="fas fa-angle-down"
                              aria-hidden="true"
                            />
                          </span>
                        </button>
                      </div>
                      <div
                        className="dropdown-menu"
                        id="dropdown-menu"
                        role="menu"
                      >
                        <div className="dropdown-content">
                          <Link
                            to="/login"
                            className="dropdown-item"
                            onClick={() => setIsDropdownActive(false)}
                          >
                            Login
                          </Link>
                          <Link
                            to="/register"
                            className="dropdown-item"
                            onClick={() => setIsDropdownActive(false)}
                          >
                            Register
                          </Link>
                          <hr className="dropdown-divider" />
                          <p className="pl-4">Welcome Celeb</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Navigation (Collapsible Dropdown) */}
              <div className="navbar-start is-hidden-desktop">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="navbar-item"
                    onClick={() => setIsNavbarActive(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </section>
  );
};

export default Navbar;
