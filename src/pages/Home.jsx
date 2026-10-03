import React from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  CalendarDays,
  CheckCircle2,
  Clock3,
  BarChart3,
  Sparkles,
  ArrowRight,
  BookOpen,
  Target,
  Zap,
} from "lucide-react";

function Home() {
  const features = [
    {
      icon: Brain,
      title: "AI Study Planner",
      description:
        "Create personalized study plans based on your subjects, exams, goals, and available time.",
    },
    {
      icon: CheckCircle2,
      title: "Smart Tasks",
      description:
        "Organize assignments, revision tasks, and daily goals in one simple task manager.",
    },
    {
      icon: CalendarDays,
      title: "Study Calendar",
      description:
        "Plan exams, deadlines, study sessions, and important academic events.",
    },
    {
      icon: Clock3,
      title: "Pomodoro Focus",
      description:
        "Use focused study sessions and breaks to build a consistent study routine.",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description:
        "Track your study hours, task completion, subjects, and overall progress.",
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description:
        "Ask questions, get explanations, generate summaries, and improve your learning.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        background: "#020617",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 7%",
          borderBottom: "1px solid rgba(148,163,184,0.08)",
          background: "rgba(2,6,23,0.75)",
          backdropFilter: "blur(18px)",
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "25px",
            fontWeight: 800,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Cogni<span style={{ color: "#60a5fa" }}>va</span>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Link to="/login" className="secondary-btn">
            Login
          </Link>

          <Link to="/signup" className="primary-btn">
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "720px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "100px 7%",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(59,130,246,0.14)",
            filter: "blur(100px)",
            top: "50px",
            left: "10%",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "rgba(139,92,246,0.13)",
            filter: "blur(100px)",
            right: "5%",
            bottom: "0",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "900px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              marginBottom: "28px",
              border: "1px solid rgba(96,165,250,0.2)",
              borderRadius: "50px",
              background: "rgba(59,130,246,0.08)",
              color: "#93c5fd",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <Sparkles size={15} />
            AI-Powered Student Productivity
          </div>

          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(45px, 7vw, 78px)",
              lineHeight: 1.05,
              fontWeight: 800,
              marginBottom: "25px",
            }}
          >
            Study Smarter.
            <br />
            <span className="gradient-text">Achieve More.</span>
          </h1>

          <p
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              color: "#94a3b8",
              fontSize: "18px",
              lineHeight: 1.7,
            }}
          >
            Cogniva is your intelligent study companion that helps you plan,
            organize, focus, and understand your studies — all in one place.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              marginTop: "35px",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/signup"
              className="primary-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "14px 24px",
              }}
            >
              Start Studying
              <ArrowRight size={18} />
            </Link>

            <a
              href="#features"
              className="secondary-btn"
              style={{
                padding: "14px 24px",
              }}
            >
              Explore Features
            </a>
          </div>

          {/* Mini Stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "45px",
              marginTop: "70px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong style={{ fontSize: "25px" }}>AI</strong>
              <p style={{ color: "#64748b", fontSize: "13px" }}>
                Smart Planning
              </p>
            </div>

            <div>
              <strong style={{ fontSize: "25px" }}>24/7</strong>
              <p style={{ color: "#64748b", fontSize: "13px" }}>
                Study Assistant
              </p>
            </div>

            <div>
              <strong style={{ fontSize: "25px" }}>1</strong>
              <p style={{ color: "#64748b", fontSize: "13px" }}>
                Complete Workspace
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        style={{
          padding: "100px 7%",
          background: "rgba(15,23,42,0.35)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "55px",
            }}
          >
            <p
              style={{
                color: "#60a5fa",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              EVERYTHING YOU NEED
            </p>

            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(30px, 5vw, 45px)",
                marginBottom: "15px",
              }}
            >
              Your complete study workspace
            </h2>

            <p
              style={{
                maxWidth: "650px",
                margin: "0 auto",
                color: "#94a3b8",
                lineHeight: 1.7,
              }}
            >
              From planning your next exam to tracking your daily progress,
              Cogniva brings your entire study routine together.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "18px",
            }}
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="glass"
                  style={{
                    padding: "28px",
                    transition: "transform 0.25s ease",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "13px",
                      marginBottom: "20px",
                      color: "#93c5fd",
                      background: "rgba(59,130,246,0.12)",
                    }}
                  >
                    <Icon size={23} />
                  </div>

                  <h3
                    style={{
                      fontSize: "18px",
                      marginBottom: "10px",
                    }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    style={{
                      color: "#94a3b8",
                      lineHeight: 1.7,
                      fontSize: "14px",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          padding: "100px 7%",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            <p
              style={{
                color: "#a78bfa",
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              SIMPLE PROCESS
            </p>

            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "40px",
              }}
            >
              How Cogniva works
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                number: "01",
                icon: Target,
                title: "Set Your Goals",
                text: "Add your subjects, exams, deadlines, and study goals.",
              },
              {
                number: "02",
                icon: Brain,
                title: "Let AI Plan",
                text: "Cogniva creates a personalized study strategy for you.",
              },
              {
                number: "03",
                icon: BookOpen,
                title: "Study & Track",
                text: "Complete tasks, focus with Pomodoro, and track progress.",
              },
              {
                number: "04",
                icon: Zap,
                title: "Improve",
                text: "Use analytics and AI insights to improve your routine.",
              },
            ].map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="glass"
                  style={{
                    padding: "25px",
                  }}
                >
                  <span
                    style={{
                      color: "#60a5fa",
                      fontWeight: 800,
                      fontSize: "13px",
                    }}
                  >
                    {step.number}
                  </span>

                  <div style={{ margin: "20px 0 15px" }}>
                    <Icon size={25} color="#a78bfa" />
                  </div>

                  <h3 style={{ marginBottom: "9px" }}>
                    {step.title}
                  </h3>

                  <p
                    style={{
                      color: "#94a3b8",
                      lineHeight: 1.6,
                      fontSize: "14px",
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "30px 7% 100px",
        }}
      >
        <div
          className="ai-card"
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            textAlign: "center",
            padding: "65px 30px",
          }}
        >
          <Sparkles
            size={35}
            color="#a78bfa"
            style={{ marginBottom: "20px" }}
          />

          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(30px, 5vw, 45px)",
              marginBottom: "15px",
            }}
          >
            Ready to study smarter?
          </h2>

          <p
            style={{
              color: "#94a3b8",
              maxWidth: "550px",
              margin: "0 auto 25px",
              lineHeight: 1.7,
            }}
          >
            Build better study habits, stay organized, and let AI help you
            reach your academic goals.
          </p>

          <Link
            to="/signup"
            className="primary-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
            }}
          >
            Create Your Account
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "30px 7%",
          borderTop: "1px solid rgba(148,163,184,0.08)",
          color: "#64748b",
          textAlign: "center",
        }}
      >
        <p>
          © {new Date().getFullYear()}{" "}
          <strong style={{ color: "#94a3b8" }}>Cogniva</strong>. Study smarter.
          Achieve more.
        </p>
      </footer>
    </div>
  );
}

export default Home;