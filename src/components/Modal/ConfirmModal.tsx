import React from 'react';

interface ConfirmModalProps {
  label: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  label,
}) => (
  <div className={`modal ${isOpen ? 'open' : ''}`}>
    <div className="modal-overlay">
      <div className="modal-title">
        <h2>{label}</h2>
      </div>
      <div className="modal-content" />
      <div className="button-group">
        <button
          type="button"
          className="red-button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="green-button"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
