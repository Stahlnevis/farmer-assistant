require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

API_KEY = "AIzaSyDAaBjrJ5SB0ccsvEDiIJom7W7jLNBgyAk"

// Multer configuration remains the same
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Updated Farming Chatbot Endpoint with strict prompt
app.post("/ask", async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Question is required." });
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY); // API KEY
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const strictPrompt = `
      You are an agricultural expert specialized in farming-related topics only. 
      Respond strictly to questions about:
      - Crop cultivation
      - Plant diseases
      - Soil management
      - Agricultural practices
      - Farming equipment
      - Pest control
      - Irrigation methods
      - Organic farming

      If asked about other topics, respond: "I specialize in farming-related topics. 
      Please ask questions about agriculture, crops, or farming practices."

      Current question: ${question}

      Provide detailed information about:
      1. Disease identification (if applicable)
      2. Symptoms and affected crops
      3. Organic/chemical treatments
      4. Preventive measures
      5. Soil and irrigation advice
      6. Seasonal recommendations
    `;

    const result = await model.generateContent(strictPrompt);
    const response = result.response.text();

    res.json({ response });
  } catch (error) {
    console.error("Google API Error:", error);
    res.status(500).json({ error: "Failed to fetch response from Google AI." });
  }
});

// Updated Image Analysis Endpoint with farming restrictions
app.post("/analyze-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file uploaded." });
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imagePath = req.file.path;
    const fs = require("fs");
    const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

    const imagePrompt = `
      Analyze this image only if it's related to agriculture. 
      If farming-related, provide:
      1. Crop/plant identification
      2. Disease/pest detection
      3. Soil health observations
      4. Treatment recommendations
      5. Preventive measures
      6. Growth stage analysis

      If not farming-related, respond: "Please upload images of crops, 
      plants, soil, or farming equipment for analysis."
    `;

    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: req.file.mimetype,
      },
    };

    const result = await model.generateContent([imagePrompt, imagePart]);
    const response = result.response.text();

    res.json({ response });
  } catch (error) {
    console.error("Image Analysis Error:", error);
    res.status(500).json({ error: "Failed to analyze the image." });
  }
});

// Server setup remains the same
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);

});