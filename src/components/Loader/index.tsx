import React from 'react';

const Loader: React.FC = () => (
  <div className="loader-container">
    <h3 className="loader-label">Processing video...</h3>
    <div className="spinner" />
  </div>
);

export default Loader;
