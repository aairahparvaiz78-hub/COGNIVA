import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Brain, Eye, EyeOff, Sparkles } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    const savedUser = localStorage.getItem("cogniva_user");
    if (!savedUser) {
      setError("No account found. Create an account to get started.");
      return;
    }

    try {
      const user = JSON.parse(savedUser);
      if (
        email.trim().toLowerCase() !== user.email?.toLowerCase() ||
        password !== user.password
      ) {
        setError("That email and password don’t match. Please try again.");
        return;
      }

      localStorage.setItem("cogniva_auth", "true");
      localStorage.setItem(
        "cogniva_current_user",
        JSON.stringify({ name: user.name, email: user.email })
      );
      navigate("/dashboard");
    } catch {
      setError("Your saved account could not be read. Please create it again.");
    }
  };

  return (
    <main className="auth-page auth-screen">
      <div className="auth-frame">
        <Link to="/" className="auth-wordmark" aria-label="Cogniva home">
          <span className="auth-wordmark-icon"><Brain size={18} /></span>
          <span>cogniva<span className="auth-wordmark-dot">.</span></span>
        </Link>

        <div className="auth-layout">
          <section className="auth-story" aria-label="Welcome to Cogniva">
            <div className="auth-story-top"><span>YOUR STUDY SPACE</span><Sparkles size={16} /></div>
            <div className="auth-story-orbit auth-orbit-a" />
            <div className="auth-story-orbit auth-orbit-b" />
            <div className="auth-story-copy">
              <span className="auth-overline">A LITTLE MORE ROOM TO THINK</span>
              <h2>Keep your focus close.<br />Let the <em>noise fall away.</em></h2>
              <p>Your plans, your pace, your next small win. Pick up where you left off.</p>
            </div>
            <div className="auth-story-note">
              <span className="auth-note-mark">✳</span>
              <span><strong>One thing at a time.</strong><small>You’re right where you need to be.</small></span>
            </div>
            <div className="auth-story-bottom"><span>COGNIVA / 01</span><span>STUDY, WITH A LITTLE MORE EASE</span></div>
          </section>

          <section className="auth-form-panel">
            <div className="auth-form-heading">
              <span className="auth-overline">WELCOME BACK</span>
              <h1>Your desk is waiting.</h1>
              <p>Sign in to return to your study space.</p>
            </div>

            {error && <div className="auth-alert" role="alert">{error}</div>}

            <form onSubmit={handleLogin} className="auth-form">
              <div className="auth-field">
                <label htmlFor="login-email">Email address</label>
                <input
                  id="login-email"
                  className="auth-field-control"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="login-password">Password</label>
                <div className="auth-password-wrap">
                  <input
                    id="login-password"
                    className="auth-field-control"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-form-submit">
                Sign in <ArrowRight size={16} />
              </button>
            </form>

            <p className="auth-form-switch">New to Cogniva? <Link to="/signup">Create an account <ArrowRight size={13} /></Link></p>
            <Link to="/" className="auth-back-link"><ArrowLeft size={14} /> Back to home</Link>
          </section>
        </div>

        <footer className="auth-footer"><span>© {new Date().getFullYear()} COGNIVA</span><span>A calmer way to study.</span></footer>
      </div>
    </main>
  );
}

export default Login;