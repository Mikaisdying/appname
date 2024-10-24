import React from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

const ProductDetails = ({ dbData, addToCart }) => {
  const { id } = useParams();
  const product = dbData.find(item => item.id === parseInt(id));

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="product-details">

      <div className='product-upperbanner'>
        <h1 className='product-name'>{product.name}</h1>
        <div className='product-handle'>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)} className="btn-add">
                Add to Cart <span>${product.price}</span>
            </button>
        </div>
    </div>

      <div className="product-description">
        <h3>Product Details</h3>
        <p>{product.details}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
