import React, { useState } from 'react';
import '../../css/product-widget.css';

function ProductWidget({product, addProductToDashboard, removeProductFromDashboard }) {

  const handleAddProduct = (data) => {
    // Send data to the parent by calling the function passed as a prop
    addProductToDashboard(data);
  };

  const handleRemoveProduct = (id) => {
    // Send data to the parent by calling the function passed as a prop
    removeProductFromDashboard(id);
  };

  const { id, title, description, price,stockQuantity} = product;
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    handleAddProduct({id,title,price, quantity});
  };

  const handleRemoveFromCart = () => {
    setIsAddingToCart(false);
    handleRemoveProduct(id);
  };
  
  return (
    <div className="product-widget">
      <h2>{title}</h2>
      <p className="description">{description}</p>
      <p className="price">Price: ${price}</p>
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
        max={stockQuantity}
        disabled={isAddingToCart}
      />
      <p className="total-price">Total: ${(price * quantity).toFixed(2)}</p>
      {
        isAddingToCart ? ( <button onClick={handleRemoveFromCart} className='red-button'>Remove</button>) 
        : ( <button onClick={handleAddToCart}>Add to Cart</button> )
      }
    </div>
  );
}

export default ProductWidget;
