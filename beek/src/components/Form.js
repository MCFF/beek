import React from "react";

export default function Form(props) {
  return (
    <form onSubmit={props.onHandleSubmit}>
      <p>Name</p>

      <input
        type="text"
        placeholder="Name"
        value={props.name}
        onChange={props.onHandleChange}
        name="name"
        required
      />

      <p>Authors</p>

      <input
        type="text"
        placeholder="Authors"
        value={props.authors}
        onChange={props.onHandleChange}
        name="authors"
        required
      />

      <p>Narrators</p>

      <input
        type="text"
        placeholder="Narrators"
        value={props.narrators}
        onChange={props.onHandleChange}
        name="narrators"
        required
      />

      <p>Duration (in seconds)</p>

      <input
        type="number"
        placeholder="Duration"
        value={props.duration}
        onChange={props.onHandleChange}
        name="duration"
        required
      />

      <p>Cover</p>
      <input type="file" onChange={props.onFileChange} />

      <input
        type="submit"
        className="new--form--input__green"
        value={props.new ? "Send" : "Update"}
      />
    </form>
  );
}
