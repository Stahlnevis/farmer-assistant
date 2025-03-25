import React, { useState } from "react";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState("");

  // Handle image upload
  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

 // Analyze the uploaded image
 const analyzeImage = async () => {
  if (!image) return alert("Please upload an image!");

  const formData = new FormData();
  formData.append("image", image);

  try {
    setResponse("Processing image...");

    const res = await fetch("http://127.0.0.1:3000/analyze-image", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to analyze image.");

    const data = await res.json();
    setResponse(data.response);
  } catch (error) {
    console.error("Image Analysis Error:", error);
    setResponse("Failed to analyze the image. Please try again.");
  }
};

  // Handle farming-related questions
  const handleQuestion = async () => {
    if (!question.trim()) return alert("Please enter a question!");

    try {
      // Call the backend server
      const res = await fetch("http://127.0.0.1:3000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error("Failed to fetch response.");
      
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Fetch error:", error);
      setResponse("Failed to fetch response. Please try again.");
    }
  };

  return (
    <div className="chatbot-container">
      <h2>Farming Assistant Chatbot</h2>

      {/* Image Upload Section */}
      <div className="image-upload-section">
        <h3>Upload Plant Image</h3>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      {/* Button Container for Centering */} 
        <div className="button-container">
        <button onClick={analyzeImage}>Analyze Image</button>
      </div>
      </div>

      {/* Question Input Section */}
      <div className="question-section">
        <h3>Ask a Farming Question</h3>
        <input
          type="text"
          placeholder="Ask a farming-related question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      {/* Button Container for Centering */}
        <div className="button-container">
        <button onClick={handleQuestion}>Ask</button>
      </div>
      </div>

      {/* Response Section */}
<div className="response-section">
  <h3>Response</h3>
  <div className="response-box">
    <p>{response}</p>
  </div>
</div>
</div>
  );
};

export default Chatbot;