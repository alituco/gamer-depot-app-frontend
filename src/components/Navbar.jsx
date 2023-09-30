import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from 'react-router-dom';


import logo from '../logo.png';
import cart from '../shopping-cart.webp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Hamburger from 'hamburger-react';
import './Navbar.css';


const Navbar = () => {
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const [sellDropdown, setSellDropdown] = useState(false);

  const location = useLocation();
  
  useEffect(() => {
    // Hamburger menu automatically closes everytime redirected
    setToggleHamburger(false);
  }, [location]);

  function closeMenu() {
    setToggleHamburger(false);
  };

  function toggleSellDropdown() {
    setSellDropdown((prevState) => !prevState)
  };

  return (
    <div className='nav-bar'>
      <div className='inner-container'>
        <span>
          <a href='/'>
          <img id='logo' src={logo} alt='Logo' />
          </a>
        </span>

        <div className='mobile-hamburger'>
          <Hamburger toggled={toggleHamburger} toggle={setToggleHamburger} />
        </div>

        <ul className={`nav-options ${toggleHamburger ? 'show' : ''}`}>
          {toggleHamburger && (
          <li id='close-button'>
            <button className='close-button' onClick={closeMenu}>
              X
            </button>
        </li>
        )}
          <a style={{textDecoration: 'none', color:'inherit'}} href='/sell'>
            <li className='list-element'>
              Sell
            </li>
          </a>
          <li className='list-element'>
            <a style={{textDecoration: 'none', color:'inherit'}} href='/how-it-works'>
               How it Works
            </a>
          </li>
          <li className='list-element'>
            <a style={{textDecoration: 'none', color:'inherit'}} href='/login'>
               Login/Orders
            </a>
          </li>
          <li className='list-element'>
            <a style={{textDecoration: 'none', color:'inherit'}} href='/shopping-cart'>
                <ShoppingCartIcon style={{ fontSize: '32px'}} className='shopping-cart-icon' />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
