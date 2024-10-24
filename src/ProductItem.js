import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const ProductItem = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <h5>{product.name}</h5>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)} className="btn-add">
        <FontAwesomeIcon icon={faCartShopping} />
      </button>

      <Link to={`/product/${product.id}`}>
        <button className="btn-details btn-add">View Details</button>
      </Link>
    </div>
  );
};

export default ProductItem;
