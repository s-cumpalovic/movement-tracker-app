import React from 'react';

interface ActionProps {
  onPreviewVideo: () => void;
  onPreviewChart: () => void;
}

const PreviewActions: React.FC<ActionProps> = ({
  onPreviewVideo,
  onPreviewChart,
}) => (
  <div className="preview-actions">
    <button type="button" className="custom-button purple-button" onClick={onPreviewVideo}>
      View Video
    </button>
    <button type="button" className="custom-button purple-button" onClick={onPreviewChart}>
      View Chart
    </button>
  </div>
);

export default PreviewActions;
