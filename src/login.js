import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/Home")
        }
    });
  const loggedIn = async () => {
    let result = await fetch(
      "https://productmanagementserver-fzzc.onrender.com/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    result = await result.json();
    if (result.name) {
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/Home");
      }
    else {
        alert("Enter the Correct Password and Email");
      }
  };
  return (
    <div className="login">
      <h1>Login</h1>
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
      <button onClick={loggedIn} type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
