import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/UsersServices";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, surname, email, username, password, password_confirmation } = formData;

    if (!name || !surname || !email || !username || !password || !password_confirmation) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await registerUser({
        ...formData,
        device: "DivajsNejm2"
      });

      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      } else {
        setError("Registration failed.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div className="input-group">
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>First Name</label>
        </div>

        <div className="input-group">
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
          <label>Last Name</label>
        </div>

        <div className="input-group">
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          <label>Username</label>
        </div>

        <div className="input-group">
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <label>Password</label>
        </div>

        <div className="input-group">
          <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
          <label>Confirm Password</label>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>{loading ? "Registering..." : "REGISTER"}</button>
        <button type="button" onClick={() => navigate("/login")}>RETURN TO LOGIN</button>
        <small>©2025 ICT Cortex. All rights reserved.</small>
      </form>
    </div>
  );
}
