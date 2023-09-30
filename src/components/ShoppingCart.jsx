import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext.js';
import './ShoppingCart.css';
import CheckoutBox from './CheckoutBox.jsx';


const ShoppingCart = () => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

  const { uid } = useContext(AuthContext);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const clearCart = async () => {
    try {
        const response = await fetch(`${API_URL}/api/clear-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: uid
            })
        });

        if (response.status !== 200) {
            throw new Error('Failed to clear cart');
        }
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
  };

  const handleRemove = (model) => {
    fetch(`${API_URL}/remove-from-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, model }),
    })
    .then(res => res.json())
    .then(data => {
      
      setItemsInCart(prevItems => {
        const updatedItems = [...prevItems];
        const itemIndex = updatedItems.findIndex(item => item.model === model);
  
        if (itemIndex > -1) {
          updatedItems[itemIndex].quantity -= 1;
  
          if (updatedItems[itemIndex].quantity <= 0) {
            updatedItems.splice(itemIndex, 1);
          }
        }
        return updatedItems;
      });
      updateTotal();
    })
    .catch(error => console.error("Error removing item from cart:", error));
    };

  useEffect(() => {
    if (uid) {
        setLoadingCart(true);
        fetch(`${API_URL}/api/user-cart?uid=${uid}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                let newTotal = 0;
                for (let i = 0; i < data.length; i++) {
                    newTotal += data[i].price;
                }
                setTotalPrice(newTotal);
                setItemsInCart(data);
                setLoadingCart(false);
                
            })
            .catch(error => {
                console.error("Error fetching user cart:", error);
                setLoadingCart(false);
                
            });
        } 
    }, [uid]);

  const isLoggedIn = uid !== null;

  const updateTotal = () => {
    fetch(`${API_URL}/api/user-cart?uid=${uid}`)
        .then((response) => {
            if (!response.ok) {
                console.log("Response to fetching user cart not OK.");
            }
            return response.json()
        })
        .then((data) => {
            let newTotal = 0;
            for (let i = 0; i < data.length; i++) {
                newTotal += data[i].price;
            }
            setTotalPrice(newTotal);
        })
        .catch((err) => {
            console.log("Error Occurred");
        })
    };

  return (
    <div className='shopping-cart-page-container'>
      
      <div className='shopping-cart-page'>
        <div className='cart-container'>
          {isLoggedIn ? (
            <>
              <div className='cart-title'>
                Selling Cart
              </div>
              <div className='test-cart'>
                {itemsInCart.map(item => (
                  <div className="cart-item" key={item._id.$oid}>
                    <div className="cart-item-details">
                      {item.model}
                    </div>
                    <div className='price-and-button'>
                      <span className='price-in-cart'>${item.price}</span>
                      <button onClick={() => handleRemove(item.model)} className="cart-item-remove">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              <CheckoutBox checkoutPrice={totalPrice} /> {/* Move CheckoutBox here */}
            </>
          ) : (
            <div className='cart-loading-text'> Please log in to view cart.</div>
          )}
        </div>
      </div> 
    </div>
);

}

export default ShoppingCart;
