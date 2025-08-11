import React from "react";
import "./RegisterButton.css";

export default function RegisterButton({ loading }) {
  return (
    <button type="submit" disabled={loading} className="register-button">
      {loading ? "Registering..." : "REGISTER"}
    </button>
  );
}
