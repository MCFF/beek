import React from "react";

import playImg from "../images/play.png";
import pauseImg from "../images/pause.png";

export default function Playback(props) {
  return !props.isPlaying ? (
    <picture className="details--controllers--playback" onClick={props.usePlay}>
      <img src={playImg} alt="play" />
    </picture>
  ) : (
    <picture
      className="details--controllers--playback"
      onClick={props.usePause}
    >
      <img src={pauseImg} alt="pause" />
    </picture>
  );
}
