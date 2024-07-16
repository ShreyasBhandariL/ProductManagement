import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const loggedIn = async () => {
    try {
      if (!email && !password && !role)
      {
        alert("Please fill all the fields");
      }else
      {
        setLoader(true);
        let result = await fetch(
          "https://productmanagementserver-fzzc.onrender.com/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, role }),
          }
        );
        result = await result.json();
        if (result.name) {
          localStorage.setItem("user", JSON.stringify(result));
          navigate("/");
        } else {
          alert("Enter the Correct Password and Email");
        }
      }
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="container">
      <div className="signup">
        <h1 style={{ color: "black" }}>Login</h1>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="d-flex role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <label>
            <input type="radio" name="role" value="1" /> Buyer
          </label>
          <label>
            <input type="radio" name="role" value="2" /> Seller
          </label>
        </div>
        <button onClick={loggedIn} type="button" className="loader" disabled={loader}>
          {loader ? "Logging in..":"Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
