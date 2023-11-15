import React from 'react';
import ProcessActions from './Action/ProcessActions';
import { ButtonActions } from './Action/constants';
import PreviewActions from './Action/PreviewActions';
import SaveVideoButton from './Action/SaveVideoButton';

interface FooterProps {
  showAction: ButtonActions;
  onConfirm: () => void;
  onPointsUndo: () => void;
  onPointsRedo: () => void;
  onPreviewChart: () => void;
  onPreviewVideo: () => void;
  onReset: () => void;
  onSaveVideo: () => void;
}

const ActionContainer: React.FC<FooterProps> = ({
  showAction,
  onConfirm,
  onPointsRedo,
  onPointsUndo,
  onPreviewChart,
  onPreviewVideo,
  onReset,
  onSaveVideo,
}) => (
  <div className="actions">
    {showAction === ButtonActions.PROCESS && (
      <ProcessActions
        onPointsUndo={onPointsUndo}
        onPointsRedo={onPointsRedo}
        onConfirm={onConfirm}
        onReset={onReset}
      />
    )}

    {showAction === ButtonActions.PREVIEW && (
      <div className="preview-actions-container">
        <PreviewActions
          onPreviewVideo={onPreviewVideo}
          onPreviewChart={onPreviewChart}
        />
        <SaveVideoButton onClick={onSaveVideo} />
      </div>
    )}
  </div>
);

export default ActionContainer;
