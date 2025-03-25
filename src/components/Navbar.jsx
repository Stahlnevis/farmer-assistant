import React from "react";
import { Link } from "react-router-dom";
// import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="bg-farm-green text-white p-4 shadow-lg">
      {/* <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/weather">Weather</Link></li>
        <li><Link to="/cost-calculator">Cost Calculator</Link></li>
      </ul> */}
       <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center">
        <Link to="/" className="text-xl font-bold">Farmer Assistant</Link>
        <div className="flex gap-6">
          <Link to="/chatbot" className="hover:text-earth-brown transition-colors">Chatbot</Link>
          <Link to="/weather" className="hover:text-earth-brown transition-colors">Weather</Link>
          <Link to="/cost-calculator" className="hover:text-earth-brown transition-colors">Cost Calculator</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
