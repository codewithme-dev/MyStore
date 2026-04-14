import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzhIGRIyYwy6wl3Q2Q1T4XUK7PW0339mUcAAuLZo6BTbOF1BTh1busAZH07nnOhaJ0E1Q/exec";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
      const res = await fetch(SCRIPT_URL + "?action=getUsers");

      const data = await res.json();

   
      if (!Array.isArray(data)) {
        setMessage("Server error: invalid data");
        return;
      }

      const user = data.find(
        (u) =>
          u.email === form.email &&
          u.password === form.password
      );

      if (!user) {
        setMessage("Wrong email or password!");
        return;
      }

     
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error(error);
      setMessage("Error logging in");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
    </div>
  );
}