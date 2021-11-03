import React, { useRef } from 'react';

function TimeoutVideo(props) {
  const vidRef = useRef(null);
  const { canPlay, handleEnd } = props;

  const playVideo = () => {
    vidRef.current.play();
  }

  canPlay && playVideo();

  const publicFolder = process.env.PUBLIC_URL;
  return (
    <video className="timeout-video" ref={vidRef} onEnded={ handleEnd } preload="auto">
      <source src={ `${publicFolder}/assets/explosion.mp4` } type="video/mp4" />
    </video>
  )
}

export default TimeoutVideo;