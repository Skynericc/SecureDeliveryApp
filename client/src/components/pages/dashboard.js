import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductWidget from '../items/product-widget.js';
import Header from '../items/header.js';
import '../../css/dashboard.css';
function Dashboard({onLogout}) {
  const user=JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API
    axios.get('http://localhost:3000/product?token='+user.token)
      .then((response) => {
        // Set the products in the state
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // State to track selected products and calculate the final price
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);

    // Function to receive data from the child
    const handleAddProduct = (data) => {
      const newItem = {
        id: data._id,
        prix: data.prix,
        title: data.titre,
        quantity: data.quantity,
      };
      setSelectedProducts([...selectedProducts, newItem]);

      setTotal(total + (data.prix * data.quantity));
    };
  
    const handleRemoveProduct = (_id) => {
      const targetProduct = selectedProducts.find((product) => product.id === _id);
      const updatedList = selectedProducts.filter((item) => item.id !== _id);
      setSelectedProducts(updatedList);
      setTotal(total - (targetProduct.prix * targetProduct.quantity));
    };


  return (
    <div>
      <Header onLogout={onLogout}></Header>
      <div className='dashboard-container'>
        <div className='products-container'>
          {products.map((product) => (
            <ProductWidget key={product._id} product={product} addProductToDashboard={handleAddProduct} 
            removeProductFromDashboard={handleRemoveProduct} />
          ))}
        </div>
        <div className="sidebar">
          <h2>Order Information</h2>
          {/* put the code to display the prodect that has been chosen and also the final price ... */}
          <p>Client : {user.nomComplet}</p>
          <p>Email : {user.email}</p>
          {
            selectedProducts.length!==0?          
            <>
              <table width='100%'>
                <thead>
                  <tr>
                    <th align='left'>Product</th>
                    <th align='right'>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((product) => (
                    <tr key={product.id}>
                      <td align='left'>{product.title}</td>
                      <td align='right'>{product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan='2' align='right'>
                      <p className='total'>Total is ${total.toFixed(2)}</p>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <br />
              <button>Poceed To Buy</button>
              </>
              :
              <></>
          }

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
