import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext.js';
import './Login.css';
import { auth, googleProvider } from '../Auth/firebase-auth/firebase.js';  
import { signInWithPopup } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';



const Login = () => {
  
  const { uid, setUid } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  

  useEffect(() => subscribeToAuthChanges(), []);


  useEffect(() => {
    if (uid) {
      setLoading(true);
      fetch(`${API_URL}/api/getOrders?uid=${uid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response not ok.')
        }
        return res.json();

      })
      .then((data) => {
        setNewOrders([...data.reverse(), ...orders]);
        setLoading(false);
        })
    
      .catch(err => {
        console.log("Error fetching orders", err);
        setLoading(false);
      });
    } else {
      setLoading(false)
    }
  }, [uid]);

  const subscribeToAuthChanges = () => {
    // setting up the listener
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChange);

    // clean up
    return () => unsubscribe();
  };

  const handleAuthStateChange = (authUser) => {
    setUid(authUser ? authUser.uid : null);
  };



  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const renderLoggedInMessage = () => (
    <div className="logged-in-message-container">
      <div className='sign-out-button-container'>
        <button className='sign-out-button' onClick={logOut}>Sign Out</button>
      </div>
      <span className="order-title">Previous Orders:</span>
      <div className='orders-container'>
          
          {newOrders.map((order) => (
            
            <div className='order' key={order._id.$oid}>
              <span><strong>Reference ID: </strong><Link to={`/order/${order.refNumber}`}>{order.refNumber}</Link></span>
              <span><strong>Created At:</strong> {new Date(order.createdAt).toLocaleDateString()}</span>
              <span><strong>First Name:</strong> {order.firstName}</span>
              <span><strong>Email:</strong> {order.emailAddress}</span>
              <span><strong>Phone number:</strong> {order.whatsappNumber}</span>
              <div> 
                <span><strong>Parts:({order.cartItems.length})</strong></span>
                <ul className='order-part-list'>
                    {order.cartItems.map((part) => (
                      <li>{part.model}</li>
                    ))}
                </ul>
                <span><strong>Total selling price:</strong> ${order.totalPrice}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
  

  const renderLoggedOutMessage = () => (
      <div className="logged-out-message-container">
        <span>Please sign in to view orders.</span>
        <button className='sign-in-button' onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
  );

  const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out", error);
    }
};



  return (
    <div className='login-container'>
      { loading ? <div className='loading-text'> Loading... </div> : <div>{uid ? renderLoggedInMessage() : renderLoggedOutMessage()} </div>}
    </div>
  );
};

export default Login;
