import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Weather from "./pages/Weather";
import CostCalculator from "./pages/CostCalculator";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/cost-calculator" element={<CostCalculator />} />
      </Routes>
      </main>
      </div>
    </Router>
  );
}

export default App;
