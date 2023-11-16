import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/png/logo.png';
import { useAppContext } from '../AppContext';
import { ROUTES } from '../routes/constants';
import ConfirmModal from '../components/Modal/ConfirmModal';

interface HeaderProps {
  showCreateButton: boolean;
  showExitButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ showCreateButton, showExitButton }) => {
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const {
    setVideoInformation,
    setSpecificRecord,
    setChartCoordinates,
  } = useAppContext();
  const navigate = useNavigate();

  const clearState = () => {
    setVideoInformation(undefined);
    setSpecificRecord(undefined);
    setChartCoordinates(undefined);
  };

  const toggleModal = () => {
    setShowConfirmModal((prevState) => !prevState);
  };

  const handleRedirectToCreate = () => {
    clearState();
    toggleModal();
    navigate(ROUTES.CREATE);
  };

  const handleRedirectToCreateWithoutModal = () => {
    clearState();
    navigate(ROUTES.CREATE);
  };

  const handlePreviewRecords = () => {
    clearState();
    navigate(ROUTES.DEFAULT);
  };

  return (
    <>
      <div className="header">
        <div
          className="header-logo"
          onClick={handlePreviewRecords}
        >
          <img
            src={logo}
            alt="logo"
            className="logo-icon"
          />
          Athos Academia
        </div>
        <div className="button-wrapper">
          {showCreateButton && (
            <button type="button" className="transparent-button" onClick={handleRedirectToCreateWithoutModal}>
              <span className="transparent-button-text">Create new record</span>
            </button>
          )}

          {showExitButton && (
            <button type="button" className="transparent-button" onClick={toggleModal}>
              <span className="transparent-button-text">Choose different video</span>
            </button>
          )}
        </div>
      </div>
      <ConfirmModal
        label={'Are you sure you want to choose a different video? \n Selected points will be lost.'}
        isOpen={showConfirmModal}
        onCancel={toggleModal}
        onConfirm={handleRedirectToCreate}
      />
    </>
  );
};

export default Header;
