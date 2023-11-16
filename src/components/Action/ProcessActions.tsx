import React from 'react';

interface ActionProps {
  onConfirm: () => void;
  onReset: () => void;
}

const ProcessActions: React.FC<ActionProps> = ({
  onConfirm,
  onReset,
}) => (
  <>
    <button type="button" className="custom-button purple-button" onClick={onReset}>
      Reset
    </button>
    <button type="button" className="custom-button blue-button" onClick={onConfirm}>
      Confirm
    </button>
  </>
);

export default ProcessActions;
