import React, { useRef, useState } from 'react';
import './index.css';
import logo from './assets/png/logo-no-background.png';
import ActionContainer from './components/ActionContainer';
import Header from './components/Header';
import VideoFrame from './components/VideoFrame';
import { ICoordinate } from './components/VideoFrame/constants';
import { structureCoordinates } from './services/calculation/videoResolution';
import { CoordinatesChartInformation, VideoInformation } from './services/interface';
import { uploadCoordinates, uploadVideo } from './services/api/mainApi';
import { ButtonActions } from './components/Action/constants';
import VideoPreview from './components/VideoFrame/VideoPreview';
import Chart from './components/Chart';
import HeroSection from './components/HeroSection';

function App() {
  const [coordinates, setCoordinates] = useState<ICoordinate[]>([]);
  const [undoStack, setUndoStack] = useState<ICoordinate[][]>([]);
  const [redoStack, setRedoStack] = useState<ICoordinate[][]>([]);
  const [coordinatesOffset, setCoordinatesOffset] = useState<ICoordinate>({
    x: 0,
    y: 0,
  });

  const [videoInformation, setVideoInformation] = useState<VideoInformation | undefined>();
  const [showAction, setShowAction] = useState<ButtonActions>(ButtonActions.UPLOAD);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [showChart, setShowChart] = useState<boolean>(false);

  const [
    chartCoordinates,
    setChartCoordinates,
  ] = useState<CoordinatesChartInformation | undefined>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
    setUndoStack([...undoStack, coordinates]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length < 1) {
      return;
    }

    const newUndoStack = undoStack.slice(0, -1);
    const lastCoordinates = undoStack[undoStack.length - 1];
    setCoordinates(lastCoordinates);
    setRedoStack([...redoStack, coordinates]);
    setUndoStack(newUndoStack);
  };

  const handleRedo = () => {
    if (redoStack.length < 1) {
      return;
    }

    const newRedoStack = redoStack.slice(0, -1);
    const nextCoordinates = redoStack[redoStack.length - 1];
    setCoordinates(nextCoordinates);
    setUndoStack([...undoStack, coordinates]);
    setRedoStack(newRedoStack);
  };

  const handleConfirm = async () => {
    if (!videoInformation || coordinates.length < 1) {
      return;
    }

    const structuredCoordinates = structureCoordinates(
      videoInformation.uuid,
      coordinates,
    );

    const chartCoordinatesData = await uploadCoordinates(structuredCoordinates);
    setChartCoordinates(chartCoordinatesData ?? undefined);
    setShowAction(ButtonActions.PREVIEW);
  };

  const handleReset = () => {
    setCoordinates([]);
  };

  const handleUploadVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const videoInformationData = await uploadVideo(file);
    setShowAction(ButtonActions.PROCESS);
    setVideoInformation(videoInformationData ?? undefined);
  };

  const handleExit = () => {
    setVideoInformation(undefined);
    setCoordinates([]);
    setShowAction(ButtonActions.UPLOAD);
  };

  const handlePreviewChart = () => {
    setShowVideo(false);
    setShowChart(true);
  };

  const handlePreviewVideo = () => {
    setShowVideo(true);
    setShowChart(false);
  };

  return (
    <div>
      <Header
        showExitButton={showAction !== ButtonActions.UPLOAD}
        onExit={handleExit}
        logo={logo}
      />
      { showAction === ButtonActions.UPLOAD && (
        <HeroSection
          openFilePicker={openFilePicker}
          fileInputRef={fileInputRef}
          onUploadVideo={handleUploadVideo}
        />
      )}
      { videoInformation && showAction !== ButtonActions.PREVIEW
        && <VideoFrame
          src={videoInformation.frameImageUrl}
          alt="Image"
          width={videoInformation.resolution.width}
          height={videoInformation.resolution.height}
          onPointsSelect={handleClicks}
          coordinates={coordinates}
          offset={coordinatesOffset}
        /> }

      { showAction === ButtonActions.PREVIEW
        && showVideo
        && <VideoPreview src={chartCoordinates?.videoUrl ?? ''} />}

      {showAction === ButtonActions.PREVIEW
        && showChart
        && <Chart chartData={chartCoordinates?.trackingData!} />}
      <ActionContainer
        showAction={showAction}
        onConfirm={handleConfirm}
        onPointsUndo={handleUndo}
        onPointsRedo={handleRedo}
        onPreviewChart={handlePreviewChart}
        onPreviewVideo={handlePreviewVideo}
        onReset={handleReset}
      />
    </div>
  );
}

export default App;
