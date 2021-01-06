import React from "react";
import ReactDOM from "react-dom";
import "./styles/loader.css";

export default function Loader(props) {
  if (!props.isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <section className="loader">
      <div className="loader--animation">
        <div>
          <div className="loader--animation--circle loader--animation--circle__first"></div>
          <div className="loader--animation--circle loader--animation--circle__second"></div>
          <div className="loader--animation--circle loader--animation--circle__third"></div>
        </div>
      </div>
      <div className="loader--text">
        <p>{props.children}</p>
      </div>
    </section>,
    document.getElementById("loader")
  );
}
