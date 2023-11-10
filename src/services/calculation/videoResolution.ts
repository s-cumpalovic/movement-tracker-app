import { ICoordinate } from '../../components/VideoFrame/constants';
import { CoordinatesInformation, ImageCoordinates } from '../interface';

export const structureCoordinates = (
  filename: string,
  coordinates: ICoordinate[],
) => {
  const imageCoordinates: ImageCoordinates = { x: [], y: [] };

  coordinates.forEach((coordinate) => {
    imageCoordinates.x.push(coordinate.x);
    imageCoordinates.y.push(coordinate.y);
  });

  const structuredCoordinates: CoordinatesInformation = {
    filename,
    coordinates: imageCoordinates,
  };

  return structuredCoordinates;
};

export const PERA = 'pera';
