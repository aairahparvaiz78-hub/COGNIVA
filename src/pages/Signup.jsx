import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Brain, Check, Eye, EyeOff, Sparkles } from "lucide-react";

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

  const handleSignup = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in every field before continuing.");
      return;
    }
    if (password.length < 6) {
      setError("Choose a password with at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Those passwords don’t match yet.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = localStorage.getItem("cogniva_user");
    if (existingUser) {
      try {
        const user = JSON.parse(existingUser);
        if (user.email === normalizedEmail) {
          setError("An account with this email already exists. Try signing in.");
          return;
        }
      } catch {
        localStorage.removeItem("cogniva_user");
      }
    }

    localStorage.setItem(
      "cogniva_user",
      JSON.stringify({ name: name.trim(), email: normalizedEmail, password })
    );
    setSuccess("Your space is ready. Taking you to sign in…");
    window.setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <main className="auth-page auth-screen">
      <div className="auth-frame">
        <Link to="/" className="auth-wordmark" aria-label="Cogniva home">
          <span className="auth-wordmark-icon"><Brain size={18} /></span>
          <span>cogniva<span className="auth-wordmark-dot">.</span></span>
        </Link>

        <div className="auth-layout">
          <section className="auth-story signup-story" aria-label="Make room for your goals">
            <div className="auth-story-top"><span>A FRESH PAGE</span><Sparkles size={16} /></div>
            <div className="auth-story-orbit auth-orbit-a" />
            <div className="auth-story-orbit auth-orbit-b" />
            <div className="auth-story-copy">
              <span className="auth-overline">YOUR NEXT CHAPTER STARTS HERE</span>
              <h2>A space for every<br /><em>next step.</em></h2>
              <p>Gather your goals, make a plan that fits your life, and let small progress add up.</p>
            </div>
            <div className="auth-mini-plan">
              <div className="auth-mini-plan-head"><span>THE PLAN FOR TODAY</span><span>03 STEPS</span></div>
              <div className="auth-mini-step"><i><Check size={11} /></i><span>Choose one thing to focus on</span></div>
              <div className="auth-mini-step"><i /> <span>Make a little time for it</span></div>
              <div className="auth-mini-step"><i /> <span>Notice the progress you made</span></div>
            </div>
            <div className="auth-story-bottom"><span>COGNIVA / 02</span><span>START SMALL. KEEP GOING.</span></div>
          </section>

          <section className="auth-form-panel signup-form-panel">
            <div className="auth-form-heading">
              <span className="auth-overline">MAKE YOURSELF AT HOME</span>
              <h1>Create your space.</h1>
              <p>A few details, then you’re ready to begin.</p>
            </div>

            {error && <div className="auth-alert" role="alert">{error}</div>}
            {success && <div className="auth-success-message" role="status"><Check size={16} />{success}</div>}

            <form onSubmit={handleSignup} className="auth-form">
              <div className="auth-field">
                <label htmlFor="signup-name">Your name</label>
                <input
                  id="signup-name"
                  className="auth-field-control"
                  type="text"
                  autoComplete="name"
                  placeholder="What should we call you?"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-email">Email address</label>
                <input
                  id="signup-email"
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
                <label htmlFor="signup-password">Create a password</label>
                <div className="auth-password-wrap">
                  <input
                    id="signup-password"
                    className="auth-field-control"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    minLength={6}
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

              <div className="auth-field">
                <label htmlFor="signup-confirm">Confirm password</label>
                <div className="auth-password-wrap">
                  <input
                    id="signup-confirm"
                    className="auth-field-control"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Enter it once more"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowConfirm((visible) => !visible)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-form-submit">
                Create my space <ArrowRight size={16} />
              </button>
            </form>

            <p className="auth-form-switch">Already have a space? <Link to="/login">Sign in <ArrowRight size={13} /></Link></p>
            <Link to="/" className="auth-back-link"><ArrowLeft size={14} /> Back to home</Link>
          </section>
        </div>

        <footer className="auth-footer"><span>© {new Date().getFullYear()} COGNIVA</span><span>A calmer way to study.</span></footer>
      </div>
    </main>
  );
}

export default Signup;