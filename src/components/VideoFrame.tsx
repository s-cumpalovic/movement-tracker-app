import React from 'react';
import { ICoordinate } from './VideoFrame/constants';
import Coordinate from './VideoFrame/Coordinate';

interface VideoFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  coordinates: ICoordinate[];
  onPointsSelect: (event: React.MouseEvent) => void;
  offset: ICoordinate;
}

const VideoFrame: React.FC<VideoFrameProps> = ({
  src, alt, width, height, coordinates, onPointsSelect, offset,
}) => (
  <div
    className="video-frame-container"
    id="video-frame-container"
  >
    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
    <img
      src={src}
      alt={alt}
      className="video-frame"
      onClick={onPointsSelect}
      width={width}
      height={height}
    />

    {coordinates.map((coordinate, index) => (
      <div key={index}>
        <Coordinate coordinate={coordinate} offset={offset} />
      </div>
    ))}
  </div>
);

export default VideoFrame;
