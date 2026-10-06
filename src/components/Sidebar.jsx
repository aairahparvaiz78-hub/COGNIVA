import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  CalendarDays,
  Timer,
  GraduationCap,
  BarChart3,
  Brain,
  MessageCircle,
  LogOut,
  X,
  Sparkles,
  Target,
  Layers3,
} from "lucide-react";

export default function Sidebar({ mobileOpen = false, onClose }) {
  const navigate = useNavigate();
  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("cogniva_current_user") || "{}");
    } catch {
      return {};
    }
  })();
  const displayName = currentUser.name?.trim() || "Student";

  const mainLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
    },
    {
      name: "Subjects",
      path: "/subjects",
      icon: BookOpen,
    },
    {
      name: "Flashcards",
      path: "/flashcards",
      icon: Layers3,
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: CalendarDays,
    },
    {
      name: "Pomodoro",
      path: "/pomodoro",
      icon: Timer,
    },
    {
      name: "Exams",
      path: "/exams",
      icon: GraduationCap,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
  ];

  const aiLinks = [
    {
      name: "AI Planner",
      path: "/ai-planner",
      icon: Brain,
    },
    {
      name: "AI Assistant",
      path: "/ai-assistant",
      icon: MessageCircle,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("cogniva_user");
    localStorage.removeItem("cogniva_auth");
    navigate("/login");
  };

  const handleNavigation = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-mobile-open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <div className="sidebar-logo">
              <Brain size={21} />
            </div>

            <span className="sidebar-brand-text">
              Cogni<span>va</span>
            </span>

            {onClose && (
              <button
                className="sidebar-close"
                onClick={onClose}
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="sidebar-scroll">
          <div className="sidebar-section">
            <span className="sidebar-label">MAIN</span>

            <nav className="sidebar-nav">
              {mainLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={handleNavigation}
                    className={({ isActive }) =>
                      `sidebar-link ${isActive ? "active" : ""}`
                    }
                  >
                    <Icon size={19} />
                    <span>{link.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="sidebar-section">
            <span className="sidebar-label">
              <Sparkles size={12} />
              AI TOOLS
            </span>

            <nav className="sidebar-nav">
              {aiLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={handleNavigation}
                    className={({ isActive }) =>
                      `sidebar-link ai-link ${isActive ? "active" : ""}`
                    }
                  >
                    <Icon size={19} />
                    <span>{link.name}</span>
                    <span className="ai-dot" />
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="sidebar-goal-card">
            <div className="sidebar-goal-icon">
              <Target size={18} />
            </div>

            <div className="sidebar-goal-content">
              <strong>Weekly Goal</strong>
              <span>72% completed</span>
            </div>

            <div className="sidebar-progress">
              <div style={{ width: "72%" }} />
            </div>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-avatar">{displayName.slice(0, 1).toUpperCase()}</div>

          <div className="sidebar-user-info">
            <strong>{displayName}</strong>
            <span>{currentUser.email || "Student"}</span>
          </div>

          <button
            className="sidebar-logout"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>
    </>
  );
}
