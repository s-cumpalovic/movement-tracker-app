import React from 'react';

interface ActionProps {
  label: string;
  onUploadVideo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  openFilePicker: () => void;
}

const UploadAction: React.FC<ActionProps> = ({
  onUploadVideo,
  fileInputRef,
  openFilePicker,
  label,
}) => (
  <div className="custom-upload-container">
    <input
      type="file"
      accept=".mp4"
      className="custom-button-file"
      ref={fileInputRef as React.RefObject<HTMLInputElement>}
      onChange={onUploadVideo}
    />
    <button
      className="upload-button"
      onClick={openFilePicker}
      type="button"
    >
      {label}
    </button>
  </div>
);

export default UploadAction;
