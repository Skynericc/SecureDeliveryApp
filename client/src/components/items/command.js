import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/command.css';

function CommandCard({ clientName, clientAddress, products, totalPrice, command, onDeleteCommand }) {
  const showSnackbar = (success) => {
    if(success){
      toast.success('command validated successfuly', {
        position: 'bottom-right',
        autoClose: 3000,
      });        
    }
    else{
      toast.error('something went wrong', {
        position: 'bottom-right',
        autoClose: 3000,
      }); 
    }
  };

  const handleConfirmCommand = () => {
    // Send a PATCH request to confirm the command
    axios
      .patch(`http://localhost:3000/command/${command._id}/confirm`)
      .then((response) => {
        // Check if the PATCH request was successful (you might want to add error handling)
        if (response.status === 200) {
          // Call the onDeleteCommand function to remove the command from the UI
          showSnackbar(true);
          onDeleteCommand(command._id);
        }
      })
      .catch((error) => {
        showSnackbar(false);
      });
  };

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
                <span className="product-title">{product.titre}</span>
                <span className="product-quantity">Quantity: {product.quantite}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="total-price">
          <p><strong>Total Price:</strong> ${parseFloat(totalPrice).toFixed(2)}</p>
        </div>
        <div className="Valider-la-commande">
              <button className="valider-button" onClick={handleConfirmCommand}>Accept</button>
        </div>
      </div>
      <ToastContainer /> 
    </div>
  );
}

export default CommandCard;
