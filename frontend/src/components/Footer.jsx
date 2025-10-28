import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-slate-400 text-white py-10 px-5 mt-14">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* SHOP */}
        <div>
          <h3 className="font-bold mb-4">SHOP</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/new-arrivals">New Arrivals</Link>
            </li>
            <li>
              <Link to="/seasonal-favourites">Seasonal Favourites</Link>
            </li>
            <li>
              <Link to="/brands">Brands</Link>
            </li>
          </ul>
        </div>

        {/* POPULAR */}
        <div>
          <h3 className="font-bold mb-4">POPULAR</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/collections">Collections</Link>
            </li>
            <li>
              <Link to="/accessories">Accessories</Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-bold mb-4">SUPPORT</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/shipping">Shipping</Link>
            </li>
          </ul>
        </div>

        {/* INFO */}
        <div>
          <h3 className="font-bold mb-4">INFO</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
