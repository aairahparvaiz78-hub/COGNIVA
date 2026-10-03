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
  Settings,
  LogOut,
  X,
  Sparkles,
  Target,
  Bell,
} from "lucide-react";

export default function Sidebar({ mobileOpen = false, onClose }) {
  const navigate = useNavigate();

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

          <div className="sidebar-section">
            <span className="sidebar-label">ACCOUNT</span>

            <nav className="sidebar-nav">
              <NavLink
                to="/settings"
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Settings size={19} />
                <span>Settings</span>
              </NavLink>

              <NavLink
                to="/notifications"
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Bell size={19} />
                <span>Notifications</span>
              </NavLink>
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
          <div className="sidebar-avatar">A</div>

          <div className="sidebar-user-info">
            <strong>Aairah</strong>
            <span>Student</span>
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