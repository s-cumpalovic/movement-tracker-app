import React from 'react';

interface HeaderProps {
  isImageReady: boolean;
  onExit: () => void;
  logo: string;
}

const Header: React.FC<HeaderProps> = ({ onExit, isImageReady, logo }) => (
  <div className="fixed top-0 w-full text-white p-2 flex items-center justify-around header">
    <img
      src={logo}
      alt="logo"
      className="header-logo"
    />
    { isImageReady && (
      <button type="button" className="custom-button transparent-button" onClick={onExit}>
        <span className="transparent-button-text">Exit</span>
      </button>
    )}
  </div>
);

export default Header;
