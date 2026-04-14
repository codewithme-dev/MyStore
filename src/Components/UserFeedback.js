import React, { useState } from "react";
import "./UserFeedback.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzhIGRIyYwy6wl3Q2Q1T4XUK7PW0339mUcAAuLZo6BTbOF1BTh1busAZH07nnOhaJ0E1Q/exec";

export default function UserFeedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(SCRIPT_URL + "?action=addFeedback", {
        method: "POST",
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.status === "success") {
        setStatus("✅ Feedback submitted successfully!");

        setForm({
          name: "",
          email: "",
          message: ""
        });
      } else {
        setStatus("❌ Failed to submit feedback");
      }
    } catch (error) {
      console.log(error);
      setStatus("❌ Server error");
    }
  };

  return (
    <div className="feedback-container">
      <h2>User Feedback</h2>

      <form onSubmit={handleSubmit} className="feedback-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Feedback"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Feedback</button>
      </form>

      <p className="status">{status}</p>
    </div>
  );
}