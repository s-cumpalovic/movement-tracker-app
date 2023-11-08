import React, { useRef, useState } from 'react';
import './index.css';
import Footer from './components/Footer';
import Header from './components/Header';
import ResponsiveImage from './components/ResponsiveImage';
import Hero from './components/Hero';
import { useUploadVideo } from './services/api';

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

  const { uploadVideo, isLoading: isVideoLoading } = useUploadVideo();

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
    // eslint-disable-next-line no-console
    console.log(coordinates);
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
  };

  const handleExit = () => {
    setIsImageReady(false);
  };

  return (
    <div>
      <Header isImageReady={isImageReady} onExit={handleExit} />
      { isImageReady
        ? <ResponsiveImage
          src="https://picsum.photos/200/300"
          alt="Dummy"
          onPointsSelect={handleClicks}
          coordinates={coordinates}
        />
        : <Hero />}
      { isVideoLoading ? 'Video loading' : ''}
      <Footer
        onPointsRedo={handleRedo}
        onPointsUndo={handleUndo}
        onConfirm={handleConfirm}
        onReset={handleReset}
        onUploadVideo={handleUploadVideo}
        isImageReady={isImageReady}
        isVideoUploaded={!!videoFile}
        file={videoFile}
        fileInputRef={fileInputRef}
        openFilePicker={openFilePicker}
      />
    </div>
  );
}

export default App;
