import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event('logout'));
    navigate("/");
  };

  return (
    <nav>
      <h2>MyStore</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about-us">AboutUs</Link>
        <Link to="/contact-us">ContactUs</Link>
        <Link to="/services">Services</Link>
        <Link to="/products-list">Products</Link>
        {/* <Link to="/login">Login</Link>
          <Link to="/signup">SignUp</Link> */}

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/user-feedback">Feedback</Link>
            <Link to="#" onClick={handleLogout}>Logout</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
