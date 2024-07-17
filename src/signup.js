import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dburl = process.env.REACT_APP_DATABASE_URL;

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const Content = async () => {
    try {
      if (!name && !email && !password && !role) {
        return alert("Please fill all the fields");
      } 
        setLoader(true);
        let result = await fetch(
          `${dburl}/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              password,
              role,
            }),
          }
        );
        result = await result.json();
        localStorage.setItem("user", JSON.stringify(result));
        console.warn(result);
        navigate("/");
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="container">
      <div className="signup">
        <h1 style={{ color: "black" }}>Register</h1>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="d-flex role" value={role} onChange={(e) => setRole(e.target.value)}>
          <label>
            <input type="radio" name="role" value="1" /> Buyer
          </label>
          <label>
            <input type="radio" name="role" value="2" /> Seller
          </label>
        </div>
        <button onClick={Content} type="button" className="loader" disabled={loader}>
          {loader ? "Signing in":"Sign UP"}
        </button>
      </div>
    </div>
  );
};

export default Signup;
