import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Styles/Nav.css";

const Nav = () => {
  const navigate = useNavigate();
  let auth = localStorage.getItem("user");
  const authRole = JSON.parse(localStorage.getItem("user"));
  const role = authRole?.role;

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <ul className="Navbar">
      {auth ? (
        <>
          <li>
            <Link to="/products">
              <i className="fas fa-box mobile-icon"></i>
              <span className="nav-text">Products</span>
            </Link>
          </li>
          {role === "2" ? (
            <>
          <li>
            <Link to="/AddProduct">
              <i className="fas fa-plus-circle mobile-icon"></i>
              <span className="nav-text">Add Product</span>
            </Link>
          </li>
            <li>
              <Link to="/CustomerList">
                <i className="fas fa-list mobile-icon"></i>
                <span className="nav-text">Buyed Product List</span>
              </Link>
              </li>
              </>
          ) : (
            <></>
          )}

          <li>
            <Link to="/ContactUs">
              <i className="fas fa-envelope mobile-icon"></i>
              <span className="nav-text">Contact Us</span>
            </Link>
          </li>
          <li>
            <Link to="/Stories">
              <i className="fas fa-book mobile-icon"></i>
              <span className="nav-text">Stories</span>
            </Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              <i className="fas fa-sign-out-alt mobile-icon"></i>
              <span className="nav-text">Logout ({JSON.parse(auth).name})</span>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/signup">
              <i className="fas fa-user-plus mobile-icon"></i>
              <span className="nav-text">Signup</span>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <i className="fas fa-sign-in-alt mobile-icon"></i>
              <span className="nav-text">Login</span>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default Nav;
