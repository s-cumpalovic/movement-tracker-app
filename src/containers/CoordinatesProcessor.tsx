import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoFrame from '../components/VideoFrame';
import { useAppContext } from '../AppContext';
import ProcessActions from '../components/Action/ProcessActions';
import { ICoordinate } from '../components/VideoFrame/constants';
import { structureCoordinates } from '../services/calculation/videoResolution';
import { uploadCoordinates } from '../services/api/mainApi';
import { adaptCoordinatesToMedia } from '../utils/videoUtils';
import { ROUTES } from '../routes/constants';
import Loader from '../components/Loader';

const CoordinatesProcessor: React.FC = () => {
  const { videoInformation, setChartCoordinates } = useAppContext();
  const navigate = useNavigate();

  const [coordinates, setCoordinates] = useState<ICoordinate[]>([]);
  const [coordinatesOffset, setCoordinatesOffset] = useState<ICoordinate>({
    x: 0,
    y: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClicks = (event: any) => {
    const parent = document.getElementById('video-frame-container');

    if (!parent) {
      return;
    }

    const bounds = event.target.getBoundingClientRect();

    const offset: ICoordinate = { x: bounds.left, y: bounds.top };
    setCoordinatesOffset(offset);

    const x = event.clientX - offset.x;
    const y = event.clientY - offset.y;

    const newCoordinates = [...coordinates, { x, y }];
    setCoordinates(newCoordinates);
  };

  const handleConfirm = async () => {
    if (!videoInformation || coordinates.length < 1) {
      return;
    }

    setIsLoading(true);

    const structuredCoordinates = structureCoordinates(
      videoInformation.uuid,
      adaptCoordinatesToMedia(coordinates, videoInformation),
    );

    const chartCoordinatesData = await uploadCoordinates(structuredCoordinates);
    setChartCoordinates(chartCoordinatesData ?? undefined);
    setIsLoading(false);
    navigate(ROUTES.PREVIEW);
  };

  const handleReset = () => {
    setCoordinates([]);
  };

  let content = null;

  if (videoInformation) {
    if (isLoading) {
      content = <Loader />;
    } else {
      content = (
        <>
          <VideoFrame
            src={videoInformation.frameImageUrl}
            alt="Image"
            width={videoInformation.resolution.width}
            height={videoInformation.resolution.height}
            onPointsSelect={handleClicks}
            coordinates={coordinates}
            offset={coordinatesOffset}
          />
          <div className="actions">
            <ProcessActions
              onConfirm={handleConfirm}
              onReset={handleReset}
            />
          </div>
        </>
      );
    }
  }

  return content;
};

export default CoordinatesProcessor;
