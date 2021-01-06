import React, { Fragment } from "react";

import "./styles/layout.css";
import searchIcon from "../images/search.png";
import back3 from "../images/back3.png";

export default function Layout(props) {
  let search;

  let goBack = () => {
    props.history.goBack();
  };

  if (props.search) {
    search = (
      <div className="layout--header--search">
        <input
          placeholder="Search for audiobooks"
          onChange={props.onChange}
          value={props.queryValue}
        />
        <picture>
          <img src={searchIcon} alt="Search icon" />
        </picture>
      </div>
    );
  } else if (props.filter) {
    search = (
      <div className="layout--header--search">
        <input
          placeholder="Filter audiobooks"
          onChange={props.onChange}
          value={props.queryValue}
        />
        <picture>
          <img src={searchIcon} alt="Search icon" />
        </picture>
      </div>
    );
  } else {
    search = (
      <div className="layout--header--back">
        <button onClick={goBack}>
          <img src={back3} alt="Back icon" />
        </button>{" "}
        <p>{props.title}</p>
      </div>
    );
  }

  return (
    <Fragment>
      <header className="layout--header">
        <picture></picture>
        {search}
      </header>
      <main className="layout--main">{props.children}</main>
    </Fragment>
  );
}
