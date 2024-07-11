import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Styles/Nav.css";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <nav className="nav">
      <div className="navbar-container">
        <div className="menu-icon" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </div>
        <ul className={`Navbar ${isActive ? "active" : ""}`}>
          {auth ? (
            <>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/AddProduct">AddProduct</Link>
              </li>
              <li>
                <Link to="/ContactUs">Contact US</Link>
              </li>
              <li>
                <Link to="/Stories">Stories</Link>
              </li>
              <li>
                <Link onClick={logout} to="/signup">
                  Logout ({JSON.parse(auth).name})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
