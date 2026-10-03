import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Brain,
  Clock3,
  CheckCircle2,
  Flame,
  ArrowLeft,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

const FOCUS_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

function Pomodoro() {
  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(() => {
    return Number(
      localStorage.getItem("cogniva_pomodoro_sessions") || 0
    );
  });

  const [completedToday, setCompletedToday] = useState(() => {
    return Number(
      localStorage.getItem("cogniva_pomodoro_today") || 0
    );
  });

  const [selectedTask, setSelectedTask] = useState("");

  const [tasks] = useState(() => {
    try {
      const saved = localStorage.getItem("cogniva_tasks");

      if (!saved) return [];

      const parsed = JSON.parse(saved);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "cogniva_pomodoro_sessions",
      String(sessions)
    );
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(
      "cogniva_pomodoro_today",
      String(completedToday)
    );
  }, [completedToday]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          setIsRunning(false);

          if (mode === "focus") {
            setSessions((previousSessions) => {
              const next = previousSessions + 1;

              localStorage.setItem(
                "cogniva_pomodoro_sessions",
                String(next)
              );

              return next;
            });

            setCompletedToday((previousCount) => {
              const next = previousCount + 1;

              localStorage.setItem(
                "cogniva_pomodoro_today",
                String(next)
              );

              return next;
            });

            setMode("short");
            return SHORT_BREAK;
          }

          setMode("focus");
          return FOCUS_TIME;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  useEffect(() => {
    if (!isRunning) return;

    document.title = `${formatTime(timeLeft)} • Cogniva`;

    return () => {
      document.title = "Cogniva";
    };
  }, [timeLeft, isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const getModeTitle = () => {
    if (mode === "focus") return "Focus Time";
    if (mode === "short") return "Short Break";
    return "Long Break";
  };

  const getModeDescription = () => {
    if (mode === "focus") {
      return "Stay focused and get your work done.";
    }

    if (mode === "short") {
      return "Take a short break and refresh your mind.";
    }

    return "Take a longer break before your next focus session.";
  };

  const getModeIcon = () => {
    if (mode === "focus") {
      return <Brain size={24} />;
    }

    return <Coffee size={24} />;
  };

  const changeMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);

    if (newMode === "focus") {
      setTimeLeft(FOCUS_TIME);
    } else if (newMode === "short") {
      setTimeLeft(SHORT_BREAK);
    } else {
      setTimeLeft(LONG_BREAK);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);

    if (mode === "focus") {
      setTimeLeft(FOCUS_TIME);
    } else if (mode === "short") {
      setTimeLeft(SHORT_BREAK);
    } else {
      setTimeLeft(LONG_BREAK);
    }
  };

  const toggleTimer = () => {
    setIsRunning((previous) => !previous);
  };

  const progress =
    mode === "focus"
      ? ((FOCUS_TIME - timeLeft) / FOCUS_TIME) * 100
      : mode === "short"
      ? ((SHORT_BREAK - timeLeft) / SHORT_BREAK) * 100
      : ((LONG_BREAK - timeLeft) / LONG_BREAK) * 100;

  const todayGoal = 8;

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        {/* Header */}
        <div className="page-header">
          <div>
            <div className="breadcrumb">
              <Link to="/dashboard">
                <ArrowLeft size={16} />
                Dashboard
              </Link>
            </div>

            <h1 className="page-title">Pomodoro Focus</h1>

            <p className="page-subtitle">
              Focus deeply, take smart breaks, and build a
              consistent study routine.
            </p>
          </div>
        </div>

        {/* Main Pomodoro */}
        <section className="pomodoro-layout">
          <div className="content-card glass pomodoro-main">
            {/* Mode Buttons */}
            <div className="pomodoro-modes">
              <button
                className={
                  mode === "focus" ? "active" : ""
                }
                onClick={() => changeMode("focus")}
              >
                <Brain size={17} />
                Focus
              </button>

              <button
                className={
                  mode === "short" ? "active" : ""
                }
                onClick={() => changeMode("short")}
              >
                <Coffee size={17} />
                Short Break
              </button>

              <button
                className={
                  mode === "long" ? "active" : ""
                }
                onClick={() => changeMode("long")}
              >
                <Coffee size={17} />
                Long Break
              </button>
            </div>

            {/* Timer */}
            <div className="pomodoro-timer-wrapper">
              <div className="pomodoro-ring">
                <div className="pomodoro-ring-progress">
                  <div className="pomodoro-time">
                    {getModeIcon()}

                    <span>{formatTime(timeLeft)}</span>

                    <small>{getModeTitle()}</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pomodoro-description">
              <h2>{getModeTitle()}</h2>

              <p>{getModeDescription()}</p>
            </div>

            {/* Controls */}
            <div className="pomodoro-controls">
              <button
                className="timer-reset"
                onClick={resetTimer}
                title="Reset timer"
              >
                <RotateCcw size={20} />
              </button>

              <button
                className="timer-play"
                onClick={toggleTimer}
              >
                {isRunning ? (
                  <>
                    <Pause size={23} />
                    Pause
                  </>
                ) : (
                  <>
                    <Play size={23} />
                    Start
                  </>
                )}
              </button>
            </div>

            {/* Progress */}
            <div className="pomodoro-progress">
              <div className="progress-header">
                <span>Current session</span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <aside className="pomodoro-side">
            {/* Today's Goal */}
            <div className="content-card glass pomodoro-stat-card">
              <div className="pomodoro-card-header">
                <div className="stat-icon">
                  <TargetIcon />
                </div>

                <div>
                  <h3>Today's Goal</h3>
                  <p>Focus sessions</p>
                </div>
              </div>

              <div className="goal-number">
                {completedToday}
                <span> / {todayGoal}</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min(
                      100,
                      (completedToday / todayGoal) * 100
                    )}%`,
                  }}
                />
              </div>

              <p className="goal-text">
                {completedToday >= todayGoal
                  ? "Daily goal completed!"
                  : `${todayGoal - completedToday} more sessions to reach your goal.`}
              </p>
            </div>

            {/* Total Sessions */}
            <div className="content-card glass pomodoro-stat-card">
              <div className="pomodoro-card-header">
                <div className="stat-icon">
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <h3>Total Sessions</h3>
                  <p>All-time focus sessions</p>
                </div>
              </div>

              <div className="large-stat">
                {sessions}
              </div>
            </div>

            {/* Streak */}
            <div className="content-card glass pomodoro-stat-card">
              <div className="pomodoro-card-header">
                <div className="stat-icon">
                  <Flame size={21} />
                </div>

                <div>
                  <h3>Focus Streak</h3>
                  <p>Keep building your habit</p>
                </div>
              </div>

              <div className="streak-value">
                {Math.max(1, Math.ceil(sessions / 4))}
                <span> days</span>
              </div>
            </div>
          </aside>
        </section>

        {/* Task Selection */}
        <section className="content-card glass pomodoro-task-section">
          <div className="section-header">
            <div>
              <h2>What are you working on?</h2>

              <p>
                Select a task to connect it with your
                focus session.
              </p>
            </div>

            <Clock3 size={22} />
          </div>

          {tasks.length === 0 ? (
            <div className="empty-state compact">
              <Clock3 size={34} />

              <h3>No tasks available</h3>

              <p>
                Add tasks from the Tasks page to track
                what you're studying.
              </p>

              <Link
                to="/tasks"
                className="primary-btn"
              >
                Go to Tasks
              </Link>
            </div>
          ) : (
            <div className="pomodoro-task-list">
              {tasks.slice(0, 8).map((task) => (
                <button
                  key={task.id}
                  className={`pomodoro-task ${
                    selectedTask === String(task.id)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedTask(String(task.id))
                  }
                >
                  <div className="task-check">
                    {selectedTask ===
                    String(task.id) ? (
                      <CheckCircle2 size={19} />
                    ) : (
                      <Clock3 size={19} />
                    )}
                  </div>

                  <div>
                    <strong>
                      {task.title || "Untitled Task"}
                    </strong>

                    {task.subject && (
                      <span>{task.subject}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* How it works */}
        <section className="content-card glass pomodoro-tips">
          <div className="section-header">
            <div>
              <h2>How Pomodoro works</h2>

              <p>
                A simple study cycle designed to keep you
                focused without burning out.
              </p>
            </div>
          </div>

          <div className="pomodoro-steps">
            <div className="pomodoro-step">
              <div className="step-number">1</div>

              <div>
                <h3>Focus</h3>
                <p>
                  Study for 25 minutes without
                  distractions.
                </p>
              </div>
            </div>

            <div className="pomodoro-step">
              <div className="step-number">2</div>

              <div>
                <h3>Short Break</h3>
                <p>
                  Take a 5-minute break to refresh.
                </p>
              </div>
            </div>

            <div className="pomodoro-step">
              <div className="step-number">3</div>

              <div>
                <h3>Repeat</h3>
                <p>
                  Complete four focus sessions before
                  taking a longer break.
                </p>
              </div>
            </div>

            <div className="pomodoro-step">
              <div className="step-number">4</div>

              <div>
                <h3>Long Break</h3>
                <p>
                  Rest for 15 minutes and start again.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function TargetIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export default Pomodoro;