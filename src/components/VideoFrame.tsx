import React from 'react';
import { ICoordinate } from './VideoFrame/constants';
import Coordinate from './VideoFrame/Coordinate';

interface VideoFrameProps {
  src: string;
  alt: string;
  coordinates: ICoordinate[];
  onPointsSelect: (event: React.MouseEvent) => void;
}

const VideoFrame: React.FC<VideoFrameProps> = ({
  src, alt, coordinates, onPointsSelect,
}) => (
  <div
    className="video-frame-container"
    onClick={onPointsSelect}
  >
    <img
      src={src}
      alt={alt}
      className="video-frame"
    />

    {coordinates.map((coordinate, index) => (
      <Coordinate coordinate={coordinate} id={index} />
    ))}
  </div>
);

export default VideoFrame;
