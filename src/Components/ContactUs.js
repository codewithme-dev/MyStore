import React from "react";
import "./ContactUs.css";

export default function Contact({ title, email, phone, address }) {
  return (
    <div className="contact-container">

      <h1>{title}</h1>

      <div className="contact-card">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Address:</strong> {address}</p>
      </div>

    </div>
  );
}