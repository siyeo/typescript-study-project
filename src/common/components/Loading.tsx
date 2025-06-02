import React from 'react';
import './Common.css';


interface LoadingProps {
  show: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  show
}) => {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner-container">
        <div className="soundwave-spinner">
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;