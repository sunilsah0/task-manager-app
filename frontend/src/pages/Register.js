import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post("/auth/register", { username, email, password });
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default Register;
