import { ICoordinate } from '../components/VideoFrame/constants';
import { VideoInformation } from '../services/interface';

export const adaptCoordinatesToMedia = (
  coordinateData: ICoordinate[],
  videoInformation?: VideoInformation,
): ICoordinate[] => {
  const parent = document.getElementById('video-frame-container');

  if (!videoInformation?.resolution || !parent) {
    return coordinateData;
  }

  const parentBound = parent.getBoundingClientRect();

  const { width: videoWidth, height: videoHeight } = videoInformation.resolution;

  const coordinates1 = coordinateData.map(({ x, y }) => {
    let modifiedX = x;
    let modifiedY = y;

    if (videoWidth > parentBound.width) {
      modifiedX = (x * videoWidth) / parentBound.width;
    }

    if (videoHeight > parentBound.height) {
      modifiedY = (y * videoHeight) / parentBound.height;
    }

    return { x: modifiedX, y: modifiedY };
  });

  return coordinates1;
};
