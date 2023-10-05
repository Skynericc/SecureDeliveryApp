import React from 'react';
import '../../css/command.css'; // Import your CSS file for styling

function CommandCard({ clientName, clientAddress, products, totalPrice }) {
  return (
    <div className="command-card">
      <div className="command-card-header">
        <h3>Order Details</h3>
      </div>
      <div className="command-card-content">
        <div className="client-info">
          <p><strong>Client Name:</strong> {clientName}</p>
          <p><strong>Client Address:</strong> {clientAddress}</p>
        </div>
        <div className="product-list">
          <h4>Ordered Products:</h4>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <span className="product-title">{product.title}</span>
                <span className="product-quantity">Quantity: {product.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="total-price">
          <p><strong>Total Price:</strong> ${totalPrice}</p>
        </div>
      </div>
    </div>
  );
}

export default CommandCard;
