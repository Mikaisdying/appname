import { BrowserRouter as Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import addToCart from "./App";

const ProductItem = ({ id }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (!id) return;

    const response = axios.get(`http://localhost:3000/products}`);
    setProduct(response.data);
  }, []);
  return (
    <div className="product-card">
      <h5>{product.name}</h5>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)} className="btn-add">
        <FontAwesomeIcon icon={faCartShopping} />
      </button>

      <Link to={`/product/${id}`}>
        <button className="btn-details btn-add">View Details</button>
      </Link>
    </div>
  );
};

export default ProductItem;
