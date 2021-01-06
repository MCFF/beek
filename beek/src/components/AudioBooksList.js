import React from "react";
import { Link } from "react-router-dom";

export default function AudioBooksList(props) {
  if (props.showingBooks === undefined || props.showingBooks.length === 0) {
    return <li className="list-no-results">🤷‍♂️ No audiobooks were found</li>;
  }

  return props.showingBooks.map((audiobook) => {
    let authors = audiobook.fields.authors["es-MX"][0];
    let originalsClassName = "list--originalsBadge hidden";
    let linkToAudioBook = `/audiobook/${audiobook.sys.id}`;

    if (audiobook.fields.is_original["es-MX"]) {
      originalsClassName = "list--originalsBadge";
    }

    for (let i = 1; i < audiobook.fields.authors["es-MX"].length; i++) {
      authors = authors + ", " + audiobook.fields.authors["es-MX"][i];
    }

    console.log(audiobook.fields.cover["es-MX"]);

    return (
      <li key={audiobook.sys.id}>
        <Link to={linkToAudioBook}>
          <div className="list--info">
            <picture className="list--cover">
              <img
                src={audiobook.fields.cover["es-MX"]}
                alt="Audiobook cover"
              />
            </picture>
            <p className="list--name">{audiobook.fields.title["es-MX"]}</p>
            <p className="list-description">
              audiocontent · 35 minutes ago · {authors}
              <br />
              <span className="list--publishedBadge">Published</span>
            </p>
          </div>
        </Link>
        <p className={originalsClassName}>Originals</p>
      </li>
    );
  });
}
