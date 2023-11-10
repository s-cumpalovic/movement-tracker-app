import React from 'react';
import UploadAction from './Action/UploadAction';

interface HeroSectionProps {
  onUploadVideo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  openFilePicker: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onUploadVideo,
  fileInputRef,
  openFilePicker,
}) => (
  <div className="hero-container">
    <div className="headline">
      <h1>Spine Movement Tracker</h1>
    </div>
    <div className="step">
      <h1>1. Upload a Video</h1>
      <p>Choose a video file from your device and upload it.</p>
    </div>
    <div className="step">
      <h1>2. Select the Points</h1>
      <p>Use the video player to select specific points on the spine that you want to track.</p>
    </div>
    <div className="step">
      <h1>3. Click &quot;Confirm&quot;</h1>
      <p>After selection, click the &quot;Confirm&quot; button and wait for the result.</p>
    </div>
    <div className="upload-button-container">
      <UploadAction
        label="Upload video"
        onUploadVideo={onUploadVideo}
        fileInputRef={fileInputRef}
        openFilePicker={openFilePicker}
      />
    </div>
  </div>
);

export default HeroSection;
