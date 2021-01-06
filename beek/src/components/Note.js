import React from "react";
import useElapsedTime from "../customHooks/useElapsedTime.js";

export default function Note(props) {
  let elapsedTime = useElapsedTime(props.note.time);

  return (
    <li key={props.index}>
      <p className="details--notes--notes--note">{props.note.note}</p>
      <p className="details--notes--notes--time">{elapsedTime}</p>
      <hr />
    </li>
  );
}
