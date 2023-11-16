import React, { useState } from 'react';

interface SaveVideoModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (title: string) => void;
}

const SaveVideoModal: React.FC<SaveVideoModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    onSave(title);
    setTitle('');
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-title">
            <h1>Save video</h1>
          </div>
          <div className="modal-form">
            <label htmlFor="video-title">Title</label>
            <input
              id="video-title"
              type="text"
              value={title}
              placeholder="Ex: patient's name, diagnosis..."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button type="button" className="red-button" onClick={onRequestClose}>
              Exit
            </button>
            <button type="button" className="green-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveVideoModal;
