import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../components/styles/options.css";

export default function Options(props) {
  if (!props.showing) {
    return null;
  }

  const link = "/edit/" + props.idAudiobook;

  return ReactDOM.createPortal(
    <section className="options">
      <h1>Options</h1>
      <ul>
        <li>
          <Link to={link}>
            <p>Edit</p>
          </Link>
        </li>
        <li onClick={props.onDelete}>Delete</li>
      </ul>
      <button onClick={props.closeOptions}>Close</button>
    </section>,
    document.getElementById("notes")
  );
}
