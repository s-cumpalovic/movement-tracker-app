import React from 'react';

interface HeaderProps {
  showExitButton: boolean;
  onExit: () => void;
  logo: string;
}

const Header: React.FC<HeaderProps> = ({ onExit, showExitButton, logo }) => (
  <div className="header">
    <img
      src={logo}
      alt="logo"
      className="header-logo"
    />
    { showExitButton && (
      <div className="button-wrapper">
        <button type="button" className="transparent-button" onClick={onExit}>
          <span className="transparent-button-text">Choose different video</span>
        </button>
      </div>
    )}
  </div>
);

export default Header;
