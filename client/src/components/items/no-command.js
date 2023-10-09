import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import icons from a library like react-icons
import { MdInfoOutline } from 'react-icons/md';
import '../../css/no-product.css';

function NoCommandCard() {
  return (
    <div className="no-product-card">
      <div className="icon">
        <FaShoppingCart size={60} />
      </div>
      <div className="message">
        <MdInfoOutline size={30} />
        <p>There are no commands available.</p>
      </div>
    </div>
  );
}

export default NoCommandCard;
