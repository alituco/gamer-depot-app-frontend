import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext.js';
import './CheckoutBox.css';

const CheckoutBox = (props) => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    console.log(API_URL);
    const { uid } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [errors, setErrors] = useState({});
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        whatsappNumber: "",
        benefitPayNumber: "",
        emailAddress: ""
    });
    const totalPrice = props.checkoutPrice;

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const phonePattern = /^[0-9]{8,10}$/;

        ["firstName", "lastName", "address", "city", "whatsappNumber", "benefitPayNumber", "emailAddress"].forEach(field => {
            if (!userData[field].trim()) formErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        });

        if (cartItems.length === 0) formErrors.cart = "Your cart is empty.";
        if (!emailPattern.test(userData.emailAddress)) formErrors.emailAddress = "Invalid email address.";
        if (!phonePattern.test(userData.whatsappNumber)) formErrors.whatsappNumber = "Invalid Whatsapp number. It should have 8 to 10 digits.";
        if (!phonePattern.test(userData.benefitPayNumber)) formErrors.benefitPayNumber = "Invalid BenefitPay number. It should have 8 to 10 digits.";

        if (Object.keys(formErrors).length > 0) isValid = false;
        setErrors(formErrors);
        return isValid;
    };

    const clearCart = async () => {
        try {
            const response = await fetch(`${API_URL}/api/clear-cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uid: uid })
            });

            if (response.status !== 200) throw new Error('Failed to clear cart');
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const handleOrder = async () => {
        if (!validateForm()) return;

        try {
            const response = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...userData,
                    uid: uid,
                    totalPrice: totalPrice,
                    cartItems: cartItems
                })
            });

            const result = await response.json();

            if (response.status === 200) console.log(result.message);
            else console.error('Error placing the order:', result.error);
        } catch (error) {
            console.error('Failed to place order:', error);
        }

        await clearCart();
        window.location.href = 'http://localhost:3000/login';
    };

    useEffect(() => {
        if (uid) {
            fetch(`${API_URL}/api/user-cart?uid=${uid}`)
                .then(res => {
                    if (!res.ok) throw new Error('Network response was not ok');
                    return res.json();
                })
                .then(data => setCartItems(data))
                .catch(error => console.error("Error fetching user cart:", error));
        }
    }, [uid]);

    return (
        <div className='checkout-box'>
            <span className='total-price-text'>
                Total price: <span style={{color: 'red'}}>${totalPrice}</span>
            </span>
            <span className='enter-checkout-details-text'> Enter your checkout details: </span>
            <div className='checkout-information'>
                {errors.firstName && <div className="error-text">{errors.firstName}</div>}
                <input 
                    value={userData.firstName}
                    onChange={(e) => setUserData(prevData => ({ ...prevData, firstName: e.target.value }))}
                    className="checkout-information-box" 
                    type="text" 
                    placeholder="First Name"
                />
                {errors.lastName && <div className="error-text">{errors.lastName}</div>}
                <input 
                    value={userData.lastName}
                    onChange={(e) => setUserData(prevData => ({ ...prevData, lastName: e.target.value }))}
                    className="checkout-information-box" 
                    type="text" 
                    placeholder="Last Name"
                />
                {errors.address && <div className="error-text">{errors.address}</div>}
                <input 
                    value={userData.address}
                    onChange={(e) => setUserData(prevData => ({ ...prevData, address: e.target.value }))}
                    className="checkout-information-box" 
                    type="text" 
                    placeholder="Address Line 1"
                />
                {errors.city && <div className="error-text">{errors.city}</div>}
                <input 
                    value={userData.city}
                    onChange={(e) => setUserData(prevData => ({ ...prevData, city: e.target.value }))}
                    className="checkout-information-box" 
                    type="text" 
                    placeholder="City"
                />
                
                <input 
                    className="checkout-information-box" 
                    type="text" 
                    value="Bahrain" 
                    readOnly 
                />
                {errors.whatsappNumber && <div className="error-text">{errors.whatsappNumber}</div>}
                <input 
                    value={userData.whatsappNumber}
                    onChange={(e) => setUserData(prevData => ({ ...prevData, whatsappNumber: e.target.value }))}
                    className="checkout-information-box" 
                    type="text" 
                    placeholder="Whatsapp Number (USA or Bahrain numbers only)"
                />
                {errors.benefitPayNumber && <div className="error-text">{errors.benefitPayNumber}</div>}
                <input 
                    value={userData.benefitPayNumber}
                    onChange={(e) => setUserData(prevData => ({ ...prevData, benefitPayNumber: e.target.value }))}
                    className="checkout-information-box" 
                    type="text" 
                    placeholder="Benefit Pay Number (USA or Bahrain numbers only)"
                />
                {errors.emailAddress && <div className="error-text">{errors.emailAddress}</div>}
                <input 
                    value={userData.emailAddress}
                    onChange={(e) => setUserData(prevData => ({ ...prevData, emailAddress: e.target.value }))}
                    className="checkout-information-box" 
                    type="email" 
                    placeholder="Email Address"
                />
                {errors.cart && <div className="error-text">{errors.cart}</div>}
            </div>
            <button onClick={handleOrder} className='checkout-button'>Place Order</button>
        </div>
    );
}

export default CheckoutBox;
