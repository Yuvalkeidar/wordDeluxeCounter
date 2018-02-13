import React from 'react';

// input field for the new task component
export default(props) => {
  return(
    <div>
      <label>{props.label}</label>
      <input
        placeholder={props.placeholder}
        className="form-control"
        value={props.value}
        type={props.type}
        required
        pattern={props.pattern}
        onChange={props.onChange}
      />
    </div>
  )
}
