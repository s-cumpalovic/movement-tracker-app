import React from 'react';

interface HeaderProps {
  showExitButton: boolean;
  onExit: () => void;
  logo: string;
}

const Header: React.FC<HeaderProps> = ({ onExit, showExitButton, logo }) => (
  <div className="top-0 w-full p-2 flex items-center justify-around header">
    <img
      src={logo}
      alt="logo"
      className="header-logo"
    />
    { showExitButton && (
      <button type="button" className="custom-button transparent-button" onClick={onExit}>
        <span className="transparent-button-text">Choose different video</span>
      </button>
    )}
  </div>
);

export default Header;
