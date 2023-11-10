import React from 'react';

interface ActionProps {
  onPointsUndo: () => void;
  onPointsRedo: () => void;
  onConfirm: () => void;
  onReset: () => void;
}

const ProcessActions: React.FC<ActionProps> = ({
  onPointsRedo,
  onPointsUndo,
  onConfirm,
  onReset,
}) => (
  <>
    <button type="button" className="custom-button purple-button" onClick={onPointsUndo}>
      Undo
    </button>
    <button type="button" className="custom-button purple-button" onClick={onPointsRedo}>
      Redo
    </button>
    <button type="button" className="custom-button yellow-button" onClick={onReset}>
      Reset
    </button>
    <button type="button" className="custom-button green-button" onClick={onConfirm}>
      Confirm
    </button>
  </>
);

export default ProcessActions;
