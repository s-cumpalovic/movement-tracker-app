import React from 'react';

interface VideoPreviewProps {
  src: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ src }) => (
  <div className="video-container">
    <video controls>
      <source src={src} />
      <track kind="captions" label="English" srcLang="en" default />
    </video>
  </div>
);

export default VideoPreview;
