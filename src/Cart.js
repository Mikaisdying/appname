import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

const Cart = ({ cart, removeFromCart }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const totalQuantity = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const handleSelectItem = (id) => {
    setSelectedItems(prev => {
      const newSelected = { ...prev, [id]: !prev[id] };
      setSelectAll(cart.every(item => newSelected[item.id]));
      return newSelected;
    });
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const newSelectedItems = {};
    cart.forEach(item => {
      newSelectedItems[item.id] = isChecked;
    });
    setSelectedItems(newSelectedItems);
    setSelectAll(isChecked);
  };

  // Cập nhật selectedItems khi cart thay đổi
  useEffect(() => {
    const newSelectedItems = {};
    cart.forEach(item => {
      newSelectedItems[item.id] = selectedItems[item.id] || false;
    });
    setSelectedItems(newSelectedItems);
    setSelectAll(cart.every(item => newSelectedItems[item.id]));
  }, [cart]); // Chỉ phụ thuộc vào cart

  return (
    <div className="cart-page">
      <div className="cart-items">
        <h2>Cart Items</h2>
        {cart.length > 0 && (
          <div>
            <label>
              <input 
                type="checkbox" 
                onChange={handleSelectAll} 
                checked={selectAll} 
                aria-label="Select all items"
              />
              Select All
            </label>
          </div>
        )}
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className='cartcard-info'>
                <h5>{item.name}</h5>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="btn-remove" 
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
              <div className="cart-checkbox">
                <input 
                  type="checkbox" 
                  checked={selectedItems[item.id] || false} 
                  onChange={() => handleSelectItem(item.id)} 
                  aria-label={`Select ${item.name}`}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <h2>Summary</h2>
        <table>
          <tbody>
            <tr>
              <td>Total Items:</td>
              <td>{totalQuantity}</td>
            </tr>
            <tr>
              <td>Total Price:</td>
              <td>${totalPrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <h2>Check List</h2>
        <div>
          {cart.map(item => (
            selectedItems[item.id] ? (
              <p key={item.id}>
                {item.name}- Price: {item.price}$ * {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
              </p>
            ) : null
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
