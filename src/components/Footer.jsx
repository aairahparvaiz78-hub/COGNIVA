import { Link } from "react-router-dom";
import {
  Brain,
  Github,
  Instagram,
  Mail,
  Twitter,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <span className="brand-icon">
                <Brain size={20} />
              </span>

              <span className="brand-text">
                Cogni<span>va</span>
              </span>
            </Link>

            <p>
              Your intelligent study companion for planning, focusing,
              organizing, and achieving more.
            </p>

            <div className="social-links">
              <a href="#" aria-label="GitHub">
                <Github size={18} />
              </a>

              <a href="#" aria-label="Twitter">
                <Twitter size={18} />
              </a>

              <a href="#" aria-label="Instagram">
                <Instagram size={18} />
              </a>

              <a href="mailto:hello@cogniva.app" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Product</h4>

            <Link to="/dashboard">
              Dashboard <ArrowUpRight size={13} />
            </Link>

            <Link to="/tasks">
              Tasks <ArrowUpRight size={13} />
            </Link>

            <Link to="/calendar">
              Calendar <ArrowUpRight size={13} />
            </Link>

            <Link to="/analytics">
              Analytics <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="footer-column">
            <h4>AI Tools</h4>

            <Link to="/ai-planner">
              AI Planner <ArrowUpRight size={13} />
            </Link>

            <Link to="/ai-assistant">
              AI Assistant <ArrowUpRight size={13} />
            </Link>

            <Link to="/pomodoro">
              Pomodoro <ArrowUpRight size={13} />
            </Link>

            <Link to="/exams">
              Exams <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="footer-column">
            <h4>Account</h4>

            <Link to="/login">
              Login <ArrowUpRight size={13} />
            </Link>

            <Link to="/signup">
              Create Account <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Cogniva. Study smarter. Achieve more.</span>

          <div>
            <span>Built for students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}