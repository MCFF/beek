import React from "react";
import ReactDOM from "react-dom";
import "../components/styles/addnotes.css";

export default function AddNote(props) {
  if (!props.showing) {
    return null;
  }

  return ReactDOM.createPortal(
    <section className="addNotes">
      <div>
        <div className="addNotes--note">
          <h1>Add note</h1>
          <input
            type="text"
            placeholder="Note"
            onChange={props.onNoteChange}
            value={props.noteValue}
          />
        </div>
        <div className="addNote--controls">
          <button
            className="addNote--controls--button addNote--controls--button__green"
            onClick={props.addNote}
          >
            Add
          </button>
          <button
            className="addNote--controls--button addNote--controls--button__red"
            onClick={props.closeAddNote}
          >
            Close
          </button>
        </div>
      </div>
    </section>,
    document.getElementById("notes")
  );
}
