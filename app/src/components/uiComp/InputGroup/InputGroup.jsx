import React from "react";
import "./InputGroup.css";


export default function InputGroup({ type, name, value, onChange, label }) {
  return (
    <div className="input-group">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder=" "
      />
      <label>{label}</label>
    </div>
  );
}
