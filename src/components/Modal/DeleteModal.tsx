import React from 'react';

interface DeleteModalProps {
  label: string;
  isOpen: boolean;
  onCancel: () => void;
  onDelete: (id: any) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onCancel,
  onDelete,
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
          className="purple-button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="red-button"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteModal;
