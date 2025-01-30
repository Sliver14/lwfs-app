import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoJSPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      fluid: true,
      sources: [{ src, type: "application/x-mpegURL" }],
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [src]);

  return <video ref={videoRef} className="video-js vjs-default-skin" />;
};

export default VideoJSPlayer;
