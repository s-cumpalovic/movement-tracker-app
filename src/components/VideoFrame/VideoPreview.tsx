import React from 'react';

interface VideoPreviewProps {
  src: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ src }) => (
  <video controls>
    <source src={src} />
    <track kind="captions" label="English" srcLang="en" default />
  </video>
);

export default VideoPreview;
