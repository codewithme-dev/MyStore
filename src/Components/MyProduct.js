import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProduct.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbymYeXlRkN_I0ijmHV3ymHxZDAeX8a1t-LV__s_uG0YJyokF0M-Wvh6Y79CfOWDze1nyQ/exec";

export default function MyProducts() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleLogout = () => {
      navigate("/");
    };
    window.addEventListener('logout', handleLogout);
    return () => window.removeEventListener('logout', handleLogout);
  }, [navigate]);

  // ======================
  // FETCH PRODUCTS
  // ======================
  const fetchProducts = async () => {
    try {
      const res = await fetch(SCRIPT_URL + "?action=getProducts");
      const data = await res.json();

      if (Array.isArray(data)) {
        // ONLY OWN PRODUCTS
        const myProducts = data.filter(
          (p) => p.userId === user?.id
        );

        setProducts(myProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ======================
  // EDIT CLICK
  // ======================
  const handleEdit = (product) => {
    setEditProduct(product);
  };

  // ======================
  // UPDATE PRODUCT
  // (Requires Apps Script update API)
  // ======================
  const handleUpdate = async () => {
    try {
      const res = await fetch(
        SCRIPT_URL + "?action=updateProduct",
        {
          method: "POST",
          body: JSON.stringify(editProduct),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        alert("Product Updated!");
        setEditProduct(null);
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-container">
      <h2>My Products</h2>

      {/* NO PRODUCTS */}
      {products.length === 0 && (
        <p className="empty">❌ No products found</p>
      )}

      {/* PRODUCTS LIST */}
      <div className="grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.imageUrl} alt="" />

            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="price">Rs {product.price}</p>

            <button
              className="edit-btn"
              onClick={() => handleEdit(product)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* EDIT FORM */}
      {editProduct && (
        <div className="edit-box">
          <h3>Edit Product</h3>

          <input
            type="text"
            value={editProduct.title}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                title: e.target.value,
              })
            }
          />

          <textarea
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                description: e.target.value,
              })
            }
          />

          <input
            type="number"
            value={editProduct.price}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                price: e.target.value,
              })
            }
          />

          <input
            type="text"
            value={editProduct.imageUrl}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                imageUrl: e.target.value,
              })
            }
          />

          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditProduct(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}