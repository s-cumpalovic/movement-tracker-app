import React from 'react';

const VideoPlayer: React.FC<{ videoSource: string }> = () => (
  <div className="video-container">
    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
    <video controls width="100%" height="100%">
      <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
      <track />
    </video>
  </div>
);

export default VideoPlayer;
