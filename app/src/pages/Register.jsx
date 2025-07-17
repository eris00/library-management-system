import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            navigate("/login");
        } catch (err) {
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>

                <div className={`input-group ${formData.firstName ? 'filled' : ''}`}>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    <label>First Name</label>
                </div>

                <div className={`input-group ${formData.lastName ? 'filled' : ''}`}>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    <label>Last Name</label>
                </div>

                <div className={`input-group ${formData.email ? 'filled' : ''}`}>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    <label>Email</label>
                </div>

                <div className={`input-group ${formData.username ? 'filled' : ''}`}>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    <label>Username</label>
                </div>

                <div className={`input-group ${formData.password ? 'filled' : ''}`}>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    <label>Password</label>
                </div>

                <div className={`input-group ${formData.confirmPassword ? 'filled' : ''}`}>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    <label>Confirm Password</label>
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "REGISTER"}
                </button>

                <button type="button" onClick={() => navigate("/login")}>
                    RETURN TO LOGIN
                </button>

                <small>©2025 ICT Cortex. All rights reserved.</small>
            </form>
        </div>
    );
}
