import React from 'react';
import './OverLayLoader.css';

type OverlayLoaderProps = {
  isLoading: boolean;
  message?: string;
};

const OverlayLoader: React.FC<OverlayLoaderProps> = ({ isLoading, message }) => {
  if (!isLoading) return null;

  return (
    <div className="overlay-loader">
      <div className="loader-container">
        <div className="spinner" />
        {message && <p className="loader-message">{message}</p>}
      </div>
    </div>
  );
};

export default OverlayLoader;
