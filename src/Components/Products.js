import React, { useEffect, useState } from "react";
import "./Products.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbymYeXlRkN_I0ijmHV3ymHxZDAeX8a1t-LV__s_uG0YJyokF0M-Wvh6Y79CfOWDze1nyQ/exec";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch(SCRIPT_URL + "?action=getProducts");
      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
      setProducts([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (nextCart) => {
    setCart(nextCart);
    localStorage.setItem("cart", JSON.stringify(nextCart));
  };

  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    let nextCart;

    if (existing) {
      nextCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      nextCart = [...cart, { ...product, quantity: 1 }];
    }

    updateCart(nextCart);
    alert("Added to cart!");
  };

  const handleCartToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleBuyNow = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert(`Proceeding to checkout with ${getCartCount()} item(s).`);
    updateCart([]);
    setSidebarOpen(false);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const removeItem = (id) => {
    const nextCart = cart.filter((item) => item.id !== id);
    updateCart(nextCart);
  };

  return (
    <div className="products-container">
      <div className="products-topbar">
        <h2>Products</h2>
        <button className="cart-toggle" onClick={handleCartToggle}>
          Cart ({getCartCount()})
        </button>
      </div>

      {sidebarOpen && (
        <div className="cart-sidebar">
          <div className="cart-sidebar-header">
            <div>
              <h3>Your Cart</h3>
              <p>{getCartCount()} item(s) added</p>
            </div>
            <button className="close-sidebar" onClick={handleCartToggle}>
              ×
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-info">
                      <p className="cart-item-title">{item.title}</p>
                      <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                      <p className="cart-item-price">Rs {item.price}</p>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-sidebar-footer">
                <button className="clear-cart" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="buy-now-sidebar" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {loading && <p>Loading products...</p>}

      {!loading && products.length === 0 && (
        <p className="no-products">❌ No products available here</p>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.imageUrl}
              alt={product.title}
              className="product-image"
            />

            <h3>{product.title}</h3>

            <p className="desc">{product.description}</p>

            <p className="price">Rs {product.price}</p>

            <div className="btn-group">
              <button
                className="cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}