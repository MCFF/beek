import React from "react";
import ReactDOM from "react-dom";
import "../components/styles/deleteAudiobook.css";

export default function DeleteAudiobook(props) {
  if (!props.showing) {
    return null;
  }

  return ReactDOM.createPortal(
    <section className="deleteAudiobooks">
      <div>
        <h1>Do you want to delete {props.title}?</h1>
        <button
          className="deleteAudiobooks--button deleteAudiobooks--button__red"
          onClick={props.confirmDelete}
        >
          Delete
        </button>
        <button
          className="deleteAudiobooks--button deleteAudiobooks--button__transparent"
          onClick={props.cancelDelete}
        >
          Cancel
        </button>
      </div>
    </section>,
    document.getElementById("notes")
  );
}
