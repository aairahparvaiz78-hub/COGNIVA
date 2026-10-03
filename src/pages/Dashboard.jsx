import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  CalendarDays,
  Timer,
  BarChart3,
  ClipboardList,
  Brain,
  MessageCircle,
  LogOut,
  Plus,
  Clock3,
  Flame,
  Target,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

function Dashboard() {
  const tasks = [
    {
      title: "Complete Java assignment",
      subject: "Java",
      time: "Today • 6:00 PM",
      priority: "High",
    },
    {
      title: "Revise Graph Theory",
      subject: "Discrete Mathematics",
      time: "Today • 8:00 PM",
      priority: "Medium",
    },
    {
      title: "Practice OS questions",
      subject: "Operating Systems",
      time: "Tomorrow • 10:00 AM",
      priority: "Low",
    },
  ];

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: CheckSquare,
      label: "Tasks",
      path: "/tasks",
    },
    {
      icon: BookOpen,
      label: "Subjects",
      path: "/subjects",
    },
    {
      icon: CalendarDays,
      label: "Calendar",
      path: "/calendar",
    },
    {
      icon: ClipboardList,
      label: "Exams",
      path: "/exams",
    },
    {
      icon: Timer,
      label: "Pomodoro",
      path: "/pomodoro",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      path: "/analytics",
    },
    {
      icon: Brain,
      label: "AI Planner",
      path: "/ai-planner",
    },
    {
      icon: MessageCircle,
      label: "AI Assistant",
      path: "/ai-assistant",
    },
  ];

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        {/* Logo */}
        <Link to="/" className="logo">
          Cogni<span>va</span>
        </Link>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`sidebar-link ${
                  item.label === "Dashboard" ? "active" : ""
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ marginTop: "35px" }}>
          <Link to="/" className="sidebar-link">
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* MAIN */}
      <main className="dashboard-main">
        {/* HEADER */}
        <header className="dashboard-header">
          <div>
            <p style={{ marginBottom: "5px" }}>Thursday, October 1</p>

            <h1>
              Good evening, <span className="gradient-text">Aairah</span> 👋
            </h1>

            <p>
              Let's make today productive and keep your study streak alive.
            </p>
          </div>

          <Link
            to="/tasks"
            className="primary-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Plus size={18} />
            Add Task
          </Link>
        </header>

        {/* STATS */}
        <section className="stats-grid">
          <div className="stat-card glass">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Today's Tasks</h3>

              <CheckSquare size={20} color="#60a5fa" />
            </div>

            <div className="stat-value">5</div>

            <p
              style={{
                color: "#22c55e",
                fontSize: "12px",
                marginTop: "6px",
              }}
            >
              3 completed
            </p>
          </div>

          <div className="stat-card glass">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Study Hours</h3>

              <Clock3 size={20} color="#a78bfa" />
            </div>

            <div className="stat-value">4.2h</div>

            <p
              style={{
                color: "#22c55e",
                fontSize: "12px",
                marginTop: "6px",
              }}
            >
              +18% this week
            </p>
          </div>

          <div className="stat-card glass">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Study Streak</h3>

              <Flame size={20} color="#f97316" />
            </div>

            <div className="stat-value">12 days</div>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "12px",
                marginTop: "6px",
              }}
            >
              Keep it going!
            </p>
          </div>

          <div className="stat-card glass">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Overall Progress</h3>

              <Target size={20} color="#22c55e" />
            </div>

            <div className="stat-value">72%</div>

            <p
              style={{
                color: "#22c55e",
                fontSize: "12px",
                marginTop: "6px",
              }}
            >
              +7% this month
            </p>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="dashboard-grid">
          {/* TASKS */}
          <div className="section-card glass">
            <div className="section-title">
              <div>
                <h2>Today's Tasks</h2>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                    marginTop: "5px",
                  }}
                >
                  Stay on top of your study goals
                </p>
              </div>

              <Link
                to="/tasks"
                style={{
                  color: "#60a5fa",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                View all
                <ChevronRight size={15} />
              </Link>
            </div>

            <div className="task-list">
              {tasks.map((task) => (
                <div className="task-card" key={task.title}>
                  <input type="checkbox" className="task-checkbox" />

                  <div className="task-info">
                    <h4>{task.title}</h4>

                    <p>
                      {task.subject} • {task.time}
                    </p>
                  </div>

                  <span
                    className="priority"
                    style={{
                      color:
                        task.priority === "High"
                          ? "#f87171"
                          : task.priority === "Medium"
                          ? "#fbbf24"
                          : "#22c55e",
                      background:
                        task.priority === "High"
                          ? "rgba(248,113,113,0.1)"
                          : task.priority === "Medium"
                          ? "rgba(251,191,36,0.1)"
                          : "rgba(34,197,94,0.1)",
                    }}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI CARD */}
          <div className="ai-card">
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(139,92,246,0.15)",
                color: "#a78bfa",
                marginBottom: "20px",
              }}
            >
              <Brain size={25} />
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#a78bfa",
                fontSize: "12px",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              <Sparkles size={14} />
              COGNIVA AI
            </div>

            <h2>Your study plan needs attention.</h2>

            <p>
              You have an upcoming exam. Let Cogniva AI organize your
              remaining study time and create a personalized revision plan.
            </p>

            <Link
              to="/ai-planner"
              className="primary-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "25px",
              }}
            >
              Generate Plan
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>

        {/* LOWER GRID */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {/* EXAMS */}
          <div className="section-card glass">
            <div className="section-title">
              <div>
                <h2>Upcoming Exams</h2>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                    marginTop: "5px",
                  }}
                >
                  Stay prepared
                </p>
              </div>

              <Link
                to="/exams"
                style={{
                  color: "#60a5fa",
                  fontSize: "13px",
                }}
              >
                View all
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px",
                  borderRadius: "12px",
                  background: "rgba(15,23,42,0.6)",
                }}
              >
                <div>
                  <strong>Java CAT 2</strong>

                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    October 8, 2026
                  </p>
                </div>

                <span
                  style={{
                    color: "#f87171",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  7 days
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px",
                  borderRadius: "12px",
                  background: "rgba(15,23,42,0.6)",
                }}
              >
                <div>
                  <strong>Discrete Mathematics</strong>

                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    October 15, 2026
                  </p>
                </div>

                <span
                  style={{
                    color: "#fbbf24",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  14 days
                </span>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="section-card glass">
            <div className="section-title">
              <div>
                <h2>Quick Actions</h2>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                    marginTop: "5px",
                  }}
                >
                  Jump into your workflow
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <Link
                to="/pomodoro"
                className="secondary-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                }}
              >
                <Timer size={17} />
                Focus Session
              </Link>

              <Link
                to="/ai-assistant"
                className="secondary-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                }}
              >
                <Brain size={17} />
                Ask AI
              </Link>

              <Link
                to="/calendar"
                className="secondary-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                }}
              >
                <CalendarDays size={17} />
                Calendar
              </Link>

              <Link
                to="/analytics"
                className="secondary-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                }}
              >
                <BarChart3 size={17} />
                Analytics
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;