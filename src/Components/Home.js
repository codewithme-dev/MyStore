import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      window.location.reload();
    };
    window.addEventListener('logout', handleLogout);
    return () => window.removeEventListener('logout', handleLogout);
  }, []);

  return (
    <div className="home-container">
      {user && (
        <div className="welcome-message">
          Welcome, {user.firstName}
          <Link to="/products">Add Product</Link>
        </div>
      )}

      {/* HERO SECTION */}
      {/* <div className="hero">
        <h1>Buy & Sell Products Easily</h1>
        <p>A simple marketplace for buyers and sellers</p>
        <button className="hero-btn">Get Started</button>
      </div> */}

      <div className="hero">
        <span className="badge">🚀 New Marketplace Platform</span>

        <h1>Buy & Sell Products Easily</h1>

        <p>A simple marketplace for buyers and sellers</p>

        <p className="sub-text">
          Join thousands of users buying and selling products safely and
          quickly.
        </p>
      </div>

      {/* FEATURE SECTION */}
      <div className="features">
        <div className="card">
          <h3>🛒 Buy Products</h3>
          <p>Browse products easily from sellers.</p>
        </div>

        <div className="card">
          <h3>💼 Become a Seller</h3>
          <p>List your products and start selling.</p>
        </div>

        <div className="card">
          <h3>⚡ Fast & Simple</h3>
          <p>Clean and easy-to-use interface.</p>
        </div>
      </div>
    </div>
  );
}
