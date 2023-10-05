import React, { useState } from 'react';
import Header from '../items/header.js';
import '../../css/admin.css';
import CommandCard from '../items/command.js';
function Admin({onLogout}) {

    const commandData = {
        clientName: 'John Doe',
        clientAddress: '123 Main St',
        products: [
          { title: 'Product 1', quantity: 3 },
          { title: 'Product 2', quantity: 2 },
        ],
        totalPrice: 100.0,
      };

    return(
        <div>
            <Header onLogout={onLogout}></Header>
            <CommandCard {...commandData} />
        </div>
    )
}

export default Admin;