import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";
import ProductItem from "./ProductItem";
import "./App.css";
import axios from "axios";

const App = () => {
  const [cart, setCart] = useState([]);
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setDbData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const productInCart = cart.find((item) => item.id === id);
    if (productInCart.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.id !== id));
    }
  };

  const getTotalItemsInCart = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <Link to="/cart" className="cart-icon">
            Cart <span className="cart-count">{getTotalItemsInCart()}</span>
          </Link>
        </nav>

        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <div className="home">
                  <h1 className="text-center">Product List</h1>
                  <div className="product-list">
                    {dbData.length > 0 ? (
                      dbData.map((product) => (
                        <ProductItem
                          key={product.id}
                          product={product}
                          addToCart={addToCart}
                        />
                      ))
                    ) : (
                      <p>'( ˶°ㅁ°) ...</p>
                    )}
                  </div>
                </div>
              }
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} removeFromCart={removeFromCart} />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetails dbData={dbData} addToCart={addToCart} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
