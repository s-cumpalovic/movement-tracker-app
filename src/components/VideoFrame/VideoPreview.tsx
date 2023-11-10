import React from 'react';

interface VideoPreviewProps {
  src: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ src }) => (
  // eslint-disable-next-line jsx-a11y/media-has-caption
  <video>
    <source src={src} />
    <track defaultValue="Ja sam pera" />
  </video>
);

export default VideoPreview;
