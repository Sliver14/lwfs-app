import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const HlsPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
    }
  }, [src]);

  return (
    <video ref={videoRef} controls width="100%" />
  );
};

export default HlsPlayer;
