import React from 'react';

const RadioPlayer = ({ className = '', title }) => {
  return (
    <div className={`follow_box widget mb30 ${className}`}>
      <h2 className="widget-title">{title}</h2>
      <div className="social_shares">
        <audio
          controls
          preload="none"
          src="https://ssl.radiosnethosting.com/index.php?port=9798">
        </audio>
      </div>
    </div>
  );
};

export default RadioPlayer;