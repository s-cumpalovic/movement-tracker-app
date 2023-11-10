import React from 'react';
import { ICoordinate } from './constants';

export interface CoordinateProps {
  coordinate: ICoordinate;
  offset: ICoordinate;
}

const Coordinate: React.FC<CoordinateProps> = ({ coordinate, offset }) => (
  <div
    className="coordinate-dot"
    style={{
      position: 'absolute',
      left: coordinate.x + offset.x,
      top: coordinate.y,
      width: '10px',
      height: '10px',
      backgroundColor: 'greenyellow',
      borderRadius: '50%',
      border: '1px black solid',
    }}
  />
);

export default Coordinate;
