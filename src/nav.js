import React from "react";
import { Link ,useNavigate} from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  }
  return (
    <div className="nav">
      <ul className="Navbar">
        {
          auth ? 
            <>
            <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/AddProduct">AddProduct</Link>
        </li>
        <li>
          <Link to="/update">UpdateProduct</Link>
        </li>
        <li>
          <Link to="/ContactUs">Contact US</Link>
        </li>
        <li>
          <Link to="/Stories">Stories</Link>
        </li>
              <li><Link onClick={logout} to="/signup">Logout({ JSON.parse(auth).name })</Link></li>
            </>
          : <>
              <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/login">Login</Link></li>
            </>  
          }
      </ul>
    </div>
  );
};

export default Nav;
