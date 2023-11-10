import React from 'react';

interface ActionProps {
  onPreviewVideo: () => void;
  onPreviewChart: () => void;
}

const UploadAction: React.FC<ActionProps> = ({
  onPreviewVideo,
  onPreviewChart,
}) => (
  <>
    <button type="button" className="custom-button green-button" onClick={onPreviewVideo}>
      Video
    </button>
    <button type="button" className="custom-button yellow-button" onClick={onPreviewChart}>
      Chart
    </button>
  </>
);

export default UploadAction;
