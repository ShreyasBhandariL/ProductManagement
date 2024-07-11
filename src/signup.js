import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/Home");
    }
  });
  const Content = async () => {
    console.warn(name, email, password);
    let result = await fetch(
      "https://productmanagementserver-fzzc.onrender.com/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result));
    console.warn(result);
    navigate("/Home");
  };
  return (
    <div className="container">
    <div className="signup">
      <h1 style={{color:"black"}}>Register</h1>
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
      <button  onClick={Content} type="button">
        Sign UP
      </button>
      </div>
      </div>
  );
};

export default Signup;
