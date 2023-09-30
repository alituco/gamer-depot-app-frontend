// OrderDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './OrderDetail.css';

const OrderDetail = () => {
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

  const { refNumber } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/getOrder?refNumber=${refNumber}`)
      .then(res => res.json())
      .then((data) => {
        setOrderDetails(data);
    })
      .catch(err => console.error(err));
  }, [refNumber]);

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <div className='order-detail-page'>
      <div className='order-detail-container'>
        <h1 className='order-details-for-text'>Order Details for: {refNumber}</h1>
        <div className="details-section">
          <p><strong>First Name:</strong> {orderDetails[0]?.firstName}</p>
          <p><strong>Last Name:</strong> {orderDetails[0]?.lastName}</p>
          <p><strong>Email Address:</strong> {orderDetails[0]?.emailAddress}</p>
          <p><strong>Date Created:</strong> {orderDetails[0]?.dateCreated}</p>
          <p><strong>Benefit Pay Number:</strong> {orderDetails[0]?.benefitPayNumber}</p>
          <p><strong>WhatsApp Number:</strong> {orderDetails[0]?.whatsappNumber}</p>
          <p><strong>Status:</strong> Processing</p>
          <div className='order-detail-parts'>
            <span><strong>Parts:({orderDetails[0]?.cartItems?.length || 0})</strong></span>
            <ul className='order-part-list'>
              {orderDetails[0]?.cartItems?.map((part) => (
                <li key={part.id || part.model}>{part.model}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
            <strong>Total price:</strong> ${orderDetails[0].totalPrice}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
