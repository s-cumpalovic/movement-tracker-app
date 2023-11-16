import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { uploadVideo } from '../services/api/mainApi';
import { useAppContext } from '../AppContext';
import { ROUTES } from '../routes/constants';
import Loader from '../components/Loader';

interface LandingSectionProps {}

const LandingSection: React.FC<LandingSectionProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setVideoInformation } = useAppContext();
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setIsLoading(true);

    if (!file) {
      return;
    }

    const videoInformationData = await uploadVideo(file);
    setVideoInformation(videoInformationData ?? undefined);
    setIsLoading(false);
    navigate(ROUTES.PROCESSOR);
  };

  return (
    <div>
      { isLoading ? (
        <Loader />
      ) : (
        <HeroSection
          openFilePicker={openFilePicker}
          fileInputRef={fileInputRef}
          onUploadVideo={handleUploadVideo}
        />
      )}
    </div>
  );
};

export default LandingSection;
