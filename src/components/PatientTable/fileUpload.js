import React, { useState, useRef } from 'react';

function ImageUpload({ onImageUpload }) {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
    </div>
  );
}

export default ImageUpload;
