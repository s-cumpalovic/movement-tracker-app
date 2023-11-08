import React from 'react';
import logo from '../assets/png/logo-no-background.png';

interface HeaderProps {
  isImageReady: boolean;
  onExit: () => void;
}

const Header: React.FC<HeaderProps> = ({ onExit, isImageReady }) => (
  <div className="fixed top-0 w-full text-white p-2 flex items-center justify-around navigation">
    <img
      src={logo}
      alt="logo"
      width={150}
      height={50}
    />
    { isImageReady && (
      <button type="button" className="custom-button transparent-button" onClick={onExit}>
        <span className="transparent-button-text">Choose different video</span>
      </button>
    )}
  </div>
);

export default Header;
