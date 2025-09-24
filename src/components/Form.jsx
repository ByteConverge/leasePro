import React from "react";

function Form(props) {
  return (
    <div>
        <label htmlFor={props.label}>Name</label>
        <input type={props.input}></input>
    </div>
  );
}

export default Form;
