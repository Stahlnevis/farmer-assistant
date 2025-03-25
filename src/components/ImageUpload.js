import React, { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  // Handle image file selection
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!image) {
      setMessage("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setMessage("Uploading image...");

      const response = await fetch("http://127.0.0.1:3000/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const data = await response.json();
      setMessage(data.message);
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>

      {message && <p>{message}</p>}

      {imageUrl && (
        <div className="image-preview">
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%", height: "auto" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;