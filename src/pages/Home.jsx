import React from "react";
import { Link } from "react-router-dom";
import background from "../assets/farm-bg.jpg"; // Import the background image

export default function Home() {
  return (
    <div 
      className="relative text-center py-16 px-4 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>  

      {/* Content - Ensure it's above the overlay */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6">
          Smart Farming Solutions
        </h1>
        <p className="text-xl text-gray-200 drop-shadow-md mb-8 max-w-2xl mx-auto">
          Manage your agricultural activities with AI-powered tools and real-time insights.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            to="/chatbot"
            className="bg-earth-brown text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition shadow-md"
          >
            Ask the Chatbot
          </Link>
          <Link 
            to="/weather"
            className="bg-farm-green text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition shadow-md"
          >
            Check Weather
          </Link>
        </div>
      </div>
    </div>
  );
}
