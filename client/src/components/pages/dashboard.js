import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductWidget from '../items/product-widget.js';
import Header from '../items/header.js';
import NoProductCard from '../items/no-product.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/dashboard.css';

function Dashboard({onLogout}) {
  const user=JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState(null);
  const [readyToBuy, setReadyToBuy] = useState(false);

  const handleAddressChange = (e) => {
    const addressPattern = /^[0-9]+\s[a-zA-Z\s]+$/;
    if(e.target.value && e.target.value!='' && e.target.value.length>6 && addressPattern.test(e.target.value)) setReadyToBuy(true)
    else setReadyToBuy(false)
    setAddress(e.target.value);
  };

  useEffect(() => {
    // Fetch the list of products from API
    if(user)
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

    const handlePorceedToBuy= ()=>{
      const transformedProducts = selectedProducts.map((product) => ({
        produit: product.id,
        titre: product.title,
        quantite: product.quantity,
      }));

      if(user)
      axios.post('http://localhost:3000/command?token='+user.token, {
        "utilisateur": user.id,
        "produits": transformedProducts,
        "adresse":address,
        "totalPrice": total,
      })
      .then(response => {
        showSnackbar(true);
      })
      .catch(error => {
        showSnackbar(false);
      });
    }

    const showSnackbar = (success) => {
      if(success){
        toast.success('command saved successfuly', {
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
  
  return (
    <div>
      <Header onLogout={onLogout}></Header>
      
      { products.length==0? <div className='client-page'><NoProductCard></NoProductCard></div>:
      <div className='dashboard-container'>
        
        <div className='products-container'>
        {products.map((product) => (
          <ProductWidget key={product._id} product={product} addProductToDashboard={handleAddProduct} 
          removeProductFromDashboard={handleRemoveProduct} />
        ))}
      </div>
  
        <div className="sidebar">
          <h2>Order Information</h2>
          <p>Client : { user? user.nomComplet: ''}</p>
          <p>Email : { user? user.email: ''}</p>
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
              <table width="100%">
                <tr>
                  <td align='left'>
                    Delivery address :
                  </td>
                  <td align='right'>
                  <input
                    type="text"
                    id="user-address"
                    value={address}
                    onChange={handleAddressChange}
                    required/>                    
                  </td>
                </tr>
              </table>
              <br/>
              {readyToBuy? <button onClick={handlePorceedToBuy}>Poceed To Buy</button>: ''}
              </>
              :
              <></>
          }

        </div>
        <ToastContainer />
      </div>
      }
    </div>
  );
}

export default Dashboard;
