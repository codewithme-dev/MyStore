import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwYJIysUY1gDy6fo0FOwXKUKPSdUtjn7zXVh2pHaD-bDS3GSYj737wM5clP0vYUWxS3fg/exec";

  // ========================
  // HANDLE INPUT CHANGE
  // ========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ========================
  // CHECK EMAIL EXISTS
  // ========================
  const checkEmailExists = async (email) => {
    try {
      const res = await fetch(SCRIPT_URL + "?action=getUsers");
      const data = await res.json();


      if (!Array.isArray(data)) {
        console.error("Invalid API response:", data);
        return false;
      }

      return data.some((user) => user.email === email);
    } catch (error) {
      console.error("Fetch error:", error);
      return false;
    }
  };

  // ========================
  // SUBMIT FORM
  // ========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const exists = await checkEmailExists(form.email);

    if (exists) {
      setMessage("❌ Email already exists!");
      return;
    }

    const userWithId = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    };

    try {
      const res = await fetch(SCRIPT_URL + "?action=register", {
        method: "POST",
        body: JSON.stringify(userWithId),
      });

      const result = await res.json();

      if (result.status === "success") {
        setMessage("Signup successful!");

        setForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage("Email already exists!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error!");
    }
  };

  // ========================
  // UI
  // ========================
  return (
    <div className="signup-container">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />

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

        <button type="submit">Signup</button>
      </form>

      <p>{message}</p>
    </div>
  );
}