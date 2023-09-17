import React from 'react';

const ImagePreviewDialog = ({ imageUrl, onClose }) => {
  return (
    <div className="image-preview-dialog">
      <div className="image-preview-content">
        <img src={imageUrl} alt="Uploaded" />
        <div className="button-group">
          <button className="button close-button" onClick={onClose}>
            Close
          </button>
          {/* Add a submit button here if needed */}
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewDialog;
