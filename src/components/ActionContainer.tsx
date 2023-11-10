import React from 'react';
import ProcessActions from './Action/ProcessActions';
import { ButtonActions } from './Action/constants';
import PreviewActions from './Action/PreviewActions';

interface FooterProps {
  showAction: ButtonActions;
  onConfirm: () => void;
  onPointsUndo: () => void;
  onPointsRedo: () => void;
  onPreviewChart: () => void;
  onPreviewVideo: () => void;
  onReset: () => void;
}

const ActionContainer: React.FC<FooterProps> = ({
  showAction,
  onConfirm,
  onPointsRedo,
  onPointsUndo,
  onPreviewChart,
  onPreviewVideo,
  onReset,
}) => (
  <div className="w-full bg-white flex items-center justify-around footer">
    {showAction === ButtonActions.PROCESS && (
      <ProcessActions
        onPointsUndo={onPointsUndo}
        onPointsRedo={onPointsRedo}
        onConfirm={onConfirm}
        onReset={onReset}
      />
    )}

    {showAction === ButtonActions.PREVIEW && (
      <PreviewActions
        onPreviewVideo={onPreviewVideo}
        onPreviewChart={onPreviewChart}
      />
    )}

  </div>
);

export default ActionContainer;
