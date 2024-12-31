import React from 'react'
import ReactPlayer from 'react-player';

function LiveTv() {
  return (
    <div>
      <ReactPlayer 
        url="https://www.youtube.com/live/ZADm4ss9f04?si=I8GjZHYfWHbwm3ri"
        controls
        width="100%"
        height="400px"
      />
    </div>
  )
}

export default LiveTv
