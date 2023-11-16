import React from 'react';

interface NotificationModalProps {
  label: string;
  isOpen: boolean;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  label,
}) => (
  <div className={`modal ${isOpen ? 'open' : ''}`}>
    <div className="modal-overlay">
      <div className="delete-modal-title">
        <h2>{label}</h2>
      </div>
    </div>
  </div>
);

export default NotificationModal;
