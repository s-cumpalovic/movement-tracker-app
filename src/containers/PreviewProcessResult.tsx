import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import VideoPreview from '../components/VideoFrame/VideoPreview';
import Chart from '../components/Chart';
import SaveVideoModal from '../components/Modal/SaveVideoModal';
import PreviewActions from '../components/Action/PreviewActions';
import SaveVideoButton from '../components/Action/SaveVideoButton';
import { SaveVideoInformation } from '../services/interface';
import { saveVideo } from '../services/api/mainApi';
import NotificationModal from '../components/Modal/NotificationModal';

const PreviewProcessResult: React.FC = () => {
  const {
    chartCoordinates,
    videoInformation,
    specificRecord,
  } = useAppContext();

  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(true);
  const [showChart, setShowChart] = useState<boolean>(false);
  const [isVideoSaved, setIsVideoSaved] = useState<boolean>(false);

  const toggleSaveModal = () => {
    setShowSaveModal((prevState) => !prevState);
  };

  const toggleNotificationModal = () => {
    setShowNotificationModal(((prevState) => !prevState));
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

    toggleSaveModal();
    toggleNotificationModal();
    setIsVideoSaved(true);
    setTimeout(() => toggleNotificationModal(), 2000);
  };

  const handlePreviewChart = () => {
    setShowVideo(false);
    setShowChart(true);
  };

  const handlePreviewVideo = () => {
    setShowVideo(true);
    setShowChart(false);
  };

  const videoUrl = specificRecord ? specificRecord.videoUrl : chartCoordinates?.videoUrl!;
  const processedCoordinates = specificRecord
    ? JSON.parse(specificRecord.coordinates)
    : chartCoordinates?.trackingData!;

  const labelSaveSuccess = 'Record saved and added to archive.';

  return (
    <>
      { showVideo && <VideoPreview src={videoUrl} /> }
      { showChart && <Chart chartData={processedCoordinates} /> }
      { showSaveModal && <SaveVideoModal
        isOpen={showSaveModal}
        onRequestClose={toggleSaveModal}
        onSave={handleSaveProcessedVideo}
      /> }
      { showNotificationModal && <NotificationModal
        label={labelSaveSuccess}
        isOpen={showNotificationModal}
      /> }
      <div className="actions">
        <div className="preview-actions-container">
          <PreviewActions
            onPreviewVideo={handlePreviewVideo}
            onPreviewChart={handlePreviewChart}
          />
          { !specificRecord && !isVideoSaved && <SaveVideoButton onClick={toggleSaveModal} /> }
        </div>
      </div>
    </>
  );
};

export default PreviewProcessResult;
