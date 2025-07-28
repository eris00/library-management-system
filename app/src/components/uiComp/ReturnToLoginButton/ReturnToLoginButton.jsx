import React from "react";
import "./ReturnToLogin.css";

import { useNavigate } from "react-router-dom";

export default function ReturnToLoginButton() {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate("/login")}>
      RETURN TO LOGIN
    </button>
  );
}
