import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  Sparkles,
  Target,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-badge">
            <Sparkles size={15} />
            AI-Powered Student Productivity
          </div>

          <h1>
            Study Smarter.
            <br />
            <span className="gradient-text">Achieve More.</span>
          </h1>

          <p>
            Cogniva is your intelligent study companion that helps you plan,
            organize, focus, and understand your studies — all in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="primary-btn hero-btn">
              Start Studying
              <ArrowRight size={18} />
            </Link>

            <a href="#features" className="secondary-btn hero-btn">
              Explore Features
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <Brain size={18} />
              <span>AI Smart Planning</span>
            </div>

            <div>
              <Clock3 size={18} />
              <span>24/7 Study Assistant</span>
            </div>

            <div>
              <Target size={18} />
              <span>1 Complete Workspace</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-preview"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="preview-window glass">
            <div className="preview-topbar">
              <div className="window-dots">
                <span />
                <span />
                <span />
              </div>

              <span className="preview-title">Cogniva Dashboard</span>
            </div>

            <div className="preview-body">
              <div className="preview-sidebar">
                <div className="preview-logo">
                  <Brain size={15} />
                </div>

                <div className="preview-side-line active" />
                <div className="preview-side-line" />
                <div className="preview-side-line" />
                <div className="preview-side-line" />
                <div className="preview-side-line" />
              </div>

              <div className="preview-main">
                <div className="preview-heading">
                  <div>
                    <small>Good morning 👋</small>
                    <strong>Ready to study?</strong>
                  </div>

                  <div className="preview-avatar">A</div>
                </div>

                <div className="preview-stat-grid">
                  <div className="preview-stat">
                    <div className="preview-icon blue">
                      <CheckCircle2 size={17} />
                    </div>
                    <div>
                      <small>Tasks Done</small>
                      <strong>12</strong>
                    </div>
                  </div>

                  <div className="preview-stat">
                    <div className="preview-icon purple">
                      <Clock3 size={17} />
                    </div>
                    <div>
                      <small>Study Hours</small>
                      <strong>4.5h</strong>
                    </div>
                  </div>
                </div>

                <div className="preview-ai-card">
                  <div className="preview-ai-header">
                    <div className="preview-ai-title">
                      <Sparkles size={16} />
                      AI Study Plan
                    </div>
                    <span>Today</span>
                  </div>

                  <div className="preview-plan-item">
                    <div className="plan-check">
                      <CheckCircle2 size={15} />
                    </div>
                    <div>
                      <strong>Data Structures</strong>
                      <small>10:00 AM · 60 min</small>
                    </div>
                  </div>

                  <div className="preview-plan-item">
                    <div className="plan-check">
                      <CheckCircle2 size={15} />
                    </div>
                    <div>
                      <strong>Operating Systems</strong>
                      <small>2:00 PM · 45 min</small>
                    </div>
                  </div>
                </div>

                <div className="preview-bottom-grid">
                  <div className="preview-mini-card">
                    <CalendarDays size={18} />
                    <div>
                      <small>Next Exam</small>
                      <strong>5 days</strong>
                    </div>
                  </div>

                  <div className="preview-mini-card">
                    <TrendingUp size={18} />
                    <div>
                      <small>Progress</small>
                      <strong>78%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}