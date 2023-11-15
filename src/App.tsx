import React, { useRef, useState } from 'react';
import './index.css';
import logo from './assets/png/logo.png';
import ActionContainer from './components/ActionContainer';
import Header from './components/Header';
import VideoFrame from './components/VideoFrame';
import { ICoordinate } from './components/VideoFrame/constants';
import { structureCoordinates } from './services/calculation/videoResolution';
import { CoordinatesChartInformation, SaveVideoInformation, VideoInformation } from './services/interface';
import { saveVideo, uploadCoordinates, uploadVideo } from './services/api/mainApi';
import { ButtonActions } from './components/Action/constants';
import VideoPreview from './components/VideoFrame/VideoPreview';
import Chart from './components/Chart';
import HeroSection from './components/HeroSection';
import SaveVideoModal from './components/Modal/SaveVideoModal';
import Loader from './components/Loader';

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
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  function adaptCoordinatesToMedia(coordinateData: ICoordinate[]): ICoordinate[] {
    const parent = document.getElementById('video-frame-container');

    if (!videoInformation?.resolution || !parent) {
      return coordinateData;
    }

    const parentBound = parent.getBoundingClientRect();

    const { width: videoWidth, height: videoHeight } = videoInformation.resolution;

    const resizedCoordinates = coordinateData.map(({ x, y }) => {
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

    return resizedCoordinates;
  }

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
    setLoading(true);
    if (!videoInformation || coordinates.length < 1) {
      setLoading(false);
      return;
    }

    const structuredCoordinates = structureCoordinates(
      videoInformation.uuid,
      adaptCoordinatesToMedia(coordinates),
    );

    const chartCoordinatesData = await uploadCoordinates(structuredCoordinates);
    setChartCoordinates(chartCoordinatesData ?? undefined);
    setShowAction(ButtonActions.PREVIEW);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    handlePreviewVideo();
    setLoading(false);
  };

  const handleReset = () => {
    setCoordinates([]);
  };

  const handleUploadVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const file = event.target.files?.[0];

    if (!file) {
      setLoading(false);
      return;
    }

    const videoInformationData = await uploadVideo(file);
    setShowAction(ButtonActions.PROCESS);
    setVideoInformation(videoInformationData ?? undefined);
    setLoading(false);
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

  const toggleModal = () => {
    setShowSaveModal((prevState) => !prevState);
  };

  const handleSaveProcessedVideo = async (title: string) => {
    if (!videoInformation || !chartCoordinates) {
      return;
    }

    const videoData: SaveVideoInformation = {
      id: videoInformation.uuid,
      uuid: videoInformation.uuid,
      name: title.trim(),
      coordinates: JSON.stringify(chartCoordinates.trackingData),
    };

    await saveVideo(videoData);
  };

  return (
    <div>
      <Header
        showExitButton={showAction !== ButtonActions.UPLOAD}
        onExit={handleExit}
        logo={logo}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          {showAction === ButtonActions.UPLOAD && (
            <HeroSection
              openFilePicker={openFilePicker}
              fileInputRef={fileInputRef}
              onUploadVideo={handleUploadVideo}
            />
          )}
          {videoInformation && showAction !== ButtonActions.PREVIEW && (
            <VideoFrame
              src={videoInformation.frameImageUrl}
              alt="Image"
              width={videoInformation.resolution.width}
              height={videoInformation.resolution.height}
              onPointsSelect={handleClicks}
              coordinates={coordinates}
              offset={coordinatesOffset}
            />
          )}

          {showAction === ButtonActions.PREVIEW
            && showVideo && (
            <VideoPreview src={chartCoordinates?.videoUrl ?? ''} />
          )}

          {showAction === ButtonActions.PREVIEW
            && showChart && <Chart chartData={chartCoordinates?.trackingData!} />}
          <SaveVideoModal
            isOpen={showSaveModal}
            onRequestClose={toggleModal}
            onSave={handleSaveProcessedVideo}
          />
        </>
      )}
      <ActionContainer
        showAction={showAction}
        onConfirm={handleConfirm}
        onPointsUndo={handleUndo}
        onPointsRedo={handleRedo}
        onPreviewChart={handlePreviewChart}
        onPreviewVideo={handlePreviewVideo}
        onReset={handleReset}
        onSaveVideo={toggleModal}
      />
    </div>
  );
}

export default App;
