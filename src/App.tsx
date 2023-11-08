import React, { useRef, useState } from 'react';
import './index.css';
import logo from './assets/png/logo-no-background.png';
import ActionContainer from './components/ActionContainer';
import Header from './components/Header';
import VideoFrame from './components/VideoFrame';
import Hero from './components/Hero';
import { useUploadVideo, useProcessCoordinates } from './services/api';

import { VideoResolution } from './services/interface';

interface Coordinate {
  x: number;
  y: number;
}

function App() {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [undoStack, setUndoStack] = useState<Coordinate[][]>([]);
  const [redoStack, setRedoStack] = useState<Coordinate[][]>([]);
  const [isImageReady, setIsImageReady] = useState<boolean>(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const { uploadVideo, isLoading: isVideoLoading, videoInformation } = useUploadVideo();
  const {
    structureCoordinates,
    processCoordinates,
    calculateResolutionDifferenceIndex,
  } = useProcessCoordinates();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClicks = (event: React.MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    const newCoordinates = [...coordinates, { x, y }];
    setCoordinates(newCoordinates);
    setUndoStack([...undoStack, coordinates]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const newUndoStack = undoStack.slice(0, -1);
      const lastCoordinates = undoStack[undoStack.length - 1];
      setCoordinates(lastCoordinates);
      setRedoStack([...redoStack, coordinates]);
      setUndoStack(newUndoStack);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const newRedoStack = redoStack.slice(0, -1);
      const nextCoordinates = redoStack[redoStack.length - 1];
      setCoordinates(nextCoordinates);
      setUndoStack([...undoStack, coordinates]);
      setRedoStack(newRedoStack);
    }
  };

  const handleConfirm = () => {
    if (!videoInformation) {
      return;
    }

    const deviceResolution: VideoResolution = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const resolutionDifferenceIndex = calculateResolutionDifferenceIndex(
      videoInformation.resolution,
      deviceResolution,
    );

    const structuredCoordinates = structureCoordinates(
      videoInformation.uuid,
      coordinates,
      resolutionDifferenceIndex,
    );

    processCoordinates(structuredCoordinates);
  };

  const handleReset = () => {
    setCoordinates([]);
  };

  const handleUploadVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setVideoFile(file);
      uploadVideo(file);
    }

    setIsImageReady(true);
  };

  const handleExit = () => {
    setIsImageReady(false);
    setVideoFile(null);
    setCoordinates([]);
  };

  return (
    <div>
      <Header isImageReady={isImageReady} onExit={handleExit} logo={logo} />
      { !isVideoLoading && videoInformation
        ? <VideoFrame
          src={videoInformation.frameImageUrl}
          alt="Image"
          onPointsSelect={handleClicks}
          coordinates={coordinates}
        />
        : <Hero />}
      <ActionContainer
        onPointsRedo={handleRedo}
        onPointsUndo={handleUndo}
        onConfirm={handleConfirm}
        onReset={handleReset}
        onUploadVideo={handleUploadVideo}
        isImageReady={!!videoInformation}
        isVideoUploaded={!!videoInformation}
        file={videoFile}
        fileInputRef={fileInputRef}
        openFilePicker={openFilePicker}
      />
    </div>
  );
}

export default App;
