import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  coordinates: Coordinate[];
  onPointsSelect: (event: React.MouseEvent) => void;
}

interface Coordinate {
  x: number;
  y: number;
}

const ResponsiveImage: React.FC<ImageProps> = ({
  src, alt, coordinates, onPointsSelect,
}) => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
    }}
    onClick={onPointsSelect}
  >
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />

    {coordinates.map((dot) => (
      <div
        style={{
          position: 'absolute',
          left: dot.x,
          top: dot.y,
          width: '10px',
          height: '10px',
          backgroundColor: 'red',
          borderRadius: '50%',
        }}
      />
    ))}
  </div>
);

export default ResponsiveImage;
