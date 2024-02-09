// App.js or another parent component
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Auth/AuthProvider.js';
import './App.css'

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx'; 
import FirstSection from './components/FirstSection.jsx';
import ShoppingCart from './components/ShoppingCart.jsx'; 
import Login from './components/Login.jsx';  
import ProcessSection from './components/ProcessSection.jsx';
import ProcessSectionPage from './components/ProcessSectionPage.jsx';
import Sell from './components/Sell.jsx';
import OrderDetail from './components/OrderDetail.jsx';



const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<FirstSection />} />
          <Route path='/sell' element={<Sell />} />
          <Route path='/how-it-works' element={<ProcessSectionPage />} />
          <Route path='/shopping-cart' element={<ShoppingCart />} />
          <Route path='/order/:refNumber' key={window.location.pathname} element={<OrderDetail />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
