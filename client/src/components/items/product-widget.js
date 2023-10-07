import React, { useState } from 'react';
import '../../css/product-widget.css';

function ProductWidget({product, addProductToDashboard, removeProductFromDashboard }) {

  const handleAddProduct = (data) => {
    // Send data to the parent by calling the function passed as a prop
    addProductToDashboard(data);
  };

  const handleRemoveProduct = (_id) => {
    // Send data to the parent by calling the function passed as a prop
    removeProductFromDashboard(_id);
  };

  const { _id, titre, desc, prix,quant} = product;
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    handleAddProduct({_id,titre,prix, quantity});
  };

  const handleRemoveFromCart = () => {
    setIsAddingToCart(false);
    handleRemoveProduct(_id);
  };
  
  return (
    <div className="product-widget">
      <h2>{titre}</h2>
      <p className="desc">{desc}</p>
      <p className="prix">Price: ${prix}</p>
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
        max={quant}
        disabled={isAddingToCart}
      />
      <p className="total-price-product">Total: ${(prix * quantity).toFixed(2)}</p>
      {
        isAddingToCart ? ( <button onClick={handleRemoveFromCart} className='red-button'>Remove</button>) 
        : ( <button onClick={handleAddToCart}>Add to Cart</button> )
      }
    </div>
  );
}

export default ProductWidget;
