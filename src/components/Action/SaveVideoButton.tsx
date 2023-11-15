import React from 'react';

interface SaveVideoButtonProps {
  onClick: () => void;
}

const SaveVideoButton: React.FC<SaveVideoButtonProps> = ({ onClick }) => (
  <div className="save-video-wrapper">
    <button
      type="button"
      onClick={onClick}
      className="custom-button blue-button"
    >
      Save Processed Video...
    </button>
  </div>
);

export default SaveVideoButton;
