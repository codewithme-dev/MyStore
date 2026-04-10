import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AddProduct.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbymYeXlRkN_I0ijmHV3ymHxZDAeX8a1t-LV__s_uG0YJyokF0M-Wvh6Y79CfOWDze1nyQ/exec";

export default function AddProduct() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: ""
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ======================
  // TEXT INPUTS
  // ======================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ======================
  // IMAGE HANDLER
  // ======================
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result); // base64 image
      };

      reader.readAsDataURL(file);
    }
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      ...form,
      imageUrl: image, // 👈 base64 image
      userId: user?.id
    };

    try {
      const res = await fetch(SCRIPT_URL + "?action=addProduct", {
        method: "POST",
        body: JSON.stringify(productData)
      });

      const data = await res.json();

      if (data.status === "success") {
        alert("Product Added Successfully!");

        setForm({
          title: "",
          description: "",
          price: ""
        });

        setImage(null);
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="add-container">
      <Link to="/my-products" className="my-product-btn">
        My Products
      </Link>
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit} className="form">

        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        {/* ✅ IMAGE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          required
        />

        {/* preview */}
        {image && (
          <img
            src={image}
            alt="preview"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              marginTop: "10px"
            }}
          />
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}