import React from 'react';
import UploadAction from './Action/UploadAction';
import ProcessActions from './Action/ProcessActions';
import { ButtonActions } from './Action/constants';
import PreviewActions from './Action/PreviewActions';

interface FooterProps {
  showAction: ButtonActions;
  onPointsUndo: () => void;
  onPointsRedo: () => void;
  onConfirm: () => void;
  onReset: () => void;
  onUploadVideo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPreviewChart: () => void;
  onPreviewVideo: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  openFilePicker: () => void;
}

const ActionContainer: React.FC<FooterProps> = ({
  showAction,
  onPointsRedo,
  onPointsUndo,
  onConfirm,
  onReset,
  onUploadVideo,
  onPreviewChart,
  onPreviewVideo,
  fileInputRef,
  openFilePicker,
}) => (
  <div className="bottom-0 w-full text-white flex items-center justify-around footer">
    {showAction === ButtonActions.UPLOAD && (
      <UploadAction
        label="Upload video"
        onUploadVideo={onUploadVideo}
        fileInputRef={fileInputRef}
        openFilePicker={openFilePicker}
      />
    )}

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
