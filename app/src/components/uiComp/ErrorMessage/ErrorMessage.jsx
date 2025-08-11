import React from "react";
import "./ErrorMessage.css";

export default function ErrorMessage({ error }) {
  if (!error) return null;

  return <p className="error">{error}</p>;
}
