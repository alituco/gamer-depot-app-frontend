import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>About GAMER DEPOT</h4>
                    <p>Providing gamers with the easiest way to sell old computer parts.</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/sell">Sell</a></li>
                        <li><a href="/how-it-works">How it Works</a></li>
                        <li><a href="/login">Login/Orders</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>Email: support@gamerdepot.com</p>
                    <p>Phone: +1 (123) 456-7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2023 GAMER DEPOT, All rights reserved.</p>
                <p>© 2023 Ali Altaraif</p>
            </div>
        </div>
  )
}

export default Footer
