import React from "react";
import Navbar from "./Components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Services from "./Components/Services";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";
import AddProduct from "./Components/AddProduct";
import Products from "./Components/Products";
import MyProducts from "./Components/MyProduct";

function App() {
    const teamData = [
  {
    id: 1,
    name: "Ali Khan",
    role: "Store Manager",
    responsibility: "Manages products, pricing, and inventory"
  },
  {
    id: 2,
    name: "Ahmed Raza",
    role: "Backend Engineer",
    responsibility: "Handles database, orders, and APIs"
  },
  {
    id: 3,
    name: "Sara Ahmed",
    role: "UI/UX Designer",
    responsibility: "Designs product pages and user experience"
  },
  {
    id: 4,
    name: "Salman Fareed",
    role: "Frontend Developer",
    responsibility: "Builds product UI and shopping interface"
  },
  {
    id: 5,
    name: "Ayesha Malik",
    role: "Customer Support",
    responsibility: "Handles customer queries and support tickets"
  }
];


  const servicesData = [
  {
      name: "Fast Delivery",
      description: "We deliver products within 24 hours."
    },
    {
      name: "Best Quality",
      description: "We provide high quality products."
    },
    {
      name: "24/7 Support",
      description: "Customer support is always available."
    },
    {
      name: "Secure Payment",
      description: "100% safe and secure payments."
    }
  ];

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/about-us"
          element={
            <AboutUs
              title="About Us"
              description="We are building a simple marketplace where buyers and sellers can connect easily using modern web technology."
              team={teamData}
            />
          }
        />

        <Route
          path="/contact-us"
          element={
            <ContactUs
              title="Contact Us"
              email="support@markethub.com"
              phone="+92 300 1234567"
              address="Lahore, Pakistan"
            />
          }
        />

        <Route
          path="/services"
          element={
            <Services
              title="Our Services"
              services={servicesData}
            />
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<AddProduct />} />
        <Route path="/products-list" element={<Products />} />
        <Route path="/my-products" element={<MyProducts />} />

      </Routes>
    </Router>
  );
}

export default App;
