import React from 'react';
import { ICoordinate } from './constants';

export interface CoordinateProps {
  coordinate: ICoordinate;
  id: any;
}

const Coordinate: React.FC<CoordinateProps> = ({ coordinate, id }) => (
  <div
    key={id}
    className="coordinate-dot"
    style={{
      position: 'absolute',
      left: coordinate.x,
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
