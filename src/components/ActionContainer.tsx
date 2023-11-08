import React from 'react';

interface FooterProps {
  isImageReady: boolean;
  isVideoUploaded: boolean;
  file: File | null;
  onPointsUndo: () => void;
  onPointsRedo: () => void;
  onConfirm: () => void;
  onReset: () => void;
  onUploadVideo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  openFilePicker: () => void;
}

const Footer: React.FC<FooterProps> = ({
  isImageReady,
  isVideoUploaded,
  file,
  onPointsRedo,
  onPointsUndo,
  onConfirm,
  onReset,
  onUploadVideo,
  fileInputRef,
  openFilePicker,
}) => (
  <div className="fixed bottom-0 w-full text-white flex items-center justify-around footer">
    {!isImageReady ? (
      <div>
        <input
          type="file"
          accept=".mp4"
          ref={fileInputRef as unknown as React.RefObject<HTMLInputElement>}
          style={{ display: 'none' }}
          onChange={onUploadVideo}
        />
        <button
          className="custom-button blue-button"
          onClick={openFilePicker}
          type="button"
        >
          { !isVideoUploaded || !file ? 'Upload video' : `Video uploaded: ${file.name}` }
        </button>
      </div>
    ) : (
      <>
        <button type="button" className="custom-button purple-button" onClick={onPointsUndo}>
          Undo
        </button>
        <button type="button" className="custom-button purple-button" onClick={onPointsRedo}>
          Redo
        </button>
        <button type="button" className="custom-button yellow-button" onClick={onReset}>
          Reset
        </button>
        <button type="button" className="custom-button green-button" onClick={onConfirm}>
          Confirm
        </button>
      </>
    )}
  </div>
);

export default Footer;
