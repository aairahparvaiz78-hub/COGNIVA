import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, Eye, EyeOff, ArrowLeft } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const savedUser = localStorage.getItem("cogniva_user");

    if (!savedUser) {
      setError("No account found. Please create an account first.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      email.trim().toLowerCase() !== user.email.toLowerCase() ||
      password !== user.password
    ) {
      setError("Incorrect email or password.");
      return;
    }

    localStorage.setItem("cogniva_auth", "true");

    localStorage.setItem(
      "cogniva_current_user",
      JSON.stringify({
        name: user.name,
        email: user.email,
      })
    );

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "rgba(59,130,246,0.12)",
          filter: "blur(100px)",
          top: "-150px",
          left: "-100px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "rgba(139,92,246,0.1)",
          filter: "blur(100px)",
          bottom: "-150px",
          right: "-100px",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Back */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            color: "#94a3b8",
            fontSize: "14px",
            marginBottom: "25px",
          }}
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div
          className="glass"
          style={{
            padding: "40px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "9px",
              marginBottom: "28px",
            }}
          >
            <Brain size={30} color="#60a5fa" />

            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "27px",
                fontWeight: 800,
              }}
            >
              Cogni<span style={{ color: "#60a5fa" }}>va</span>
            </span>
          </div>

          {/* Heading */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <h1
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "28px",
                marginBottom: "8px",
              }}
            >
              Welcome back
            </h1>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "14px",
              }}
            >
              Sign in to continue your study journey.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#f87171",
                padding: "11px 13px",
                borderRadius: "10px",
                fontSize: "13px",
                marginBottom: "18px",
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email address</label>

              <input
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <div style={{ position: "relative" }}>
                <input
                  className="form-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    paddingRight: "48px",
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "transparent",
                    color: "#64748b",
                    padding: "5px",
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "22px",
              }}
            >
              <button
                type="button"
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#60a5fa",
                  fontSize: "13px",
                }}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="primary-btn"
              style={{
                width: "100%",
                padding: "14px",
              }}
            >
              Sign In
            </button>
          </form>

          {/* Signup */}
          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "14px",
              marginTop: "25px",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#60a5fa",
                fontWeight: 600,
              }}
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;