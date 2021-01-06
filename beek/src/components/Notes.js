import React from "react";
import Note from "../components/Note.js";

export default function Notes(props) {
  return props.showingNotes ? (
    <section className="details--notes">
      <div className="details--notes--buttons">
        <button onClick={props.useCloseNotes}>Close</button>
      </div>
      <div className="details--notes--notes">
        <h1>Notes</h1>
        <ul>
          {props.notes.map((note, index) => {
            return <Note key={index} note={note} index={index} />;
          })}
        </ul>
      </div>
    </section>
  ) : null;
}
