import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Brain,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate fields
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing account
    const existingUser = localStorage.getItem("cogniva_user");

    if (existingUser) {
      const user = JSON.parse(existingUser);

      if (user.email === normalizedEmail) {
        setError("An account with this email already exists.");
        return;
      }
    }

    // Create user
    const userData = {
      name: name.trim(),
      email: normalizedEmail,
      password: password,
    };

    localStorage.setItem(
      "cogniva_user",
      JSON.stringify(userData)
    );

    setSuccess("Account created successfully! Redirecting...");

    // Go to login
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-background-glow"></div>

      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <Brain size={24} />
          </div>

          <span>
            Cogni<span>va</span>
          </span>
        </div>

        {/* Header */}
        <div className="auth-header">
          <h1>Create your account</h1>

          <p>
            Start your smarter study journey with Cogniva.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSignup}
          className="auth-form"
        >

          {/* Error */}
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="auth-success">
              <CheckCircle2 size={18} />
              {success}
            </div>
          )}

          {/* Name */}
          <div className="auth-field">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="auth-field">
            <label>Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="auth-field">
            <label>Password</label>

            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="auth-field">
            <label>Confirm Password</label>

            <div className="password-input">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
              >
                {showConfirm ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="auth-submit"
          >
            Create Account
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Login */}
        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

        {/* Back Home */}
        <Link
          to="/"
          className="auth-home"
        >
          ← Back to Cogniva
        </Link>

      </div>
    </div>
  );
}

export default Signup;