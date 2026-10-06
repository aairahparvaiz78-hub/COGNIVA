import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Clock3,
  Flame,
  Target,
  TrendingUp,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

import Sidebar from "../components/Sidebar";

const DEFAULT_SUBJECTS = [
  {
    id: 1,
    name: "Data Structures",
    progress: 72,
    hours: 18,
  },
  {
    id: 2,
    name: "Operating Systems",
    progress: 58,
    hours: 14,
  },
  {
    id: 3,
    name: "Java Programming",
    progress: 81,
    hours: 21,
  },
  {
    id: 4,
    name: "Discrete Mathematics",
    progress: 46,
    hours: 10,
  },
];

const DEFAULT_TASKS = [
  {
    id: 1,
    title: "Complete DSA assignment",
    completed: true,
  },
  {
    id: 2,
    title: "Revise OS memory management",
    completed: true,
  },
  {
    id: 3,
    title: "Practice Java arrays",
    completed: false,
  },
  {
    id: 4,
    title: "Study graph theory",
    completed: true,
  },
  {
    id: 5,
    title: "Prepare CAT notes",
    completed: false,
  },
];

function Analytics() {
  const subjects = useMemo(() => {
    try {
      const saved = localStorage.getItem(
        "cogniva_subjects"
      );

      return saved
        ? JSON.parse(saved)
        : DEFAULT_SUBJECTS;
    } catch {
      return DEFAULT_SUBJECTS;
    }
  }, []);

  const tasks = useMemo(() => {
    try {
      const saved = localStorage.getItem(
        "cogniva_tasks"
      );

      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  }, []);

  const pomodoroSessions = Number(
    localStorage.getItem(
      "cogniva_pomodoro_sessions"
    ) || 0
  );

  const completedToday = Number(
    localStorage.getItem(
      "cogniva_pomodoro_today"
    ) || 0
  );

  const totalStudyHours = subjects.reduce(
    (total, subject) =>
      total + Number(subject.hours || 0),
    0
  );

  const averageProgress =
    subjects.length > 0
      ? Math.round(
          subjects.reduce(
            (total, subject) =>
              total +
              Number(subject.progress || 0),
            0
          ) / subjects.length
        )
      : 0;

  const completedTasks = tasks.filter(
    (task) =>
      task.completed ||
      task.status === "completed"
  ).length;

  const taskCompletion =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0;

  const weeklyHours = [
    {
      day: "Mon",
      hours: 2.5,
    },
    {
      day: "Tue",
      hours: 3.5,
    },
    {
      day: "Wed",
      hours: 4,
    },
    {
      day: "Thu",
      hours: 2,
    },
    {
      day: "Fri",
      hours: 4.5,
    },
    {
      day: "Sat",
      hours: 5,
    },
    {
      day: "Sun",
      hours: 3,
    },
  ];

  const totalWeeklyHours = weeklyHours.reduce(
    (total, day) => total + day.hours,
    0
  );

  const studyTrend = [
    {
      day: "Week 1",
      hours: 12,
    },
    {
      day: "Week 2",
      hours: 16,
    },
    {
      day: "Week 3",
      hours: 19,
    },
    {
      day: "Week 4",
      hours: 24,
    },
  ];

  const subjectData = subjects.map(
    (subject, index) => ({
      name:
        subject.name.length > 16
          ? `${subject.name.substring(0, 16)}...`
          : subject.name,
      hours: Number(subject.hours || 0),
      progress: Number(
        subject.progress || 0
      ),
      index,
    })
  );

  const pieData = subjects.map(
    (subject) => ({
      name: subject.name,
      value: Number(subject.hours || 0),
    })
  );

  const PIE_COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#ec4899",
  ];

  const getPerformanceLabel = () => {
    if (averageProgress >= 80) {
      return "Excellent";
    }

    if (averageProgress >= 60) {
      return "Good";
    }

    if (averageProgress >= 40) {
      return "On Track";
    }

    return "Needs Focus";
  };

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

            <h1 className="page-title">
              Analytics
            </h1>

            <p className="page-subtitle">
              Understand your study habits and track
              your academic progress.
            </p>
          </div>

          <div className="analytics-period">
            <CalendarDays size={17} />
            Last 7 days
          </div>
        </div>

        {/* Main Stats */}
        <section className="stats-grid">
          <div className="stat-card glass">
            <div className="stat-icon">
              <Clock3 size={21} />
            </div>

            <div>
              <p className="stat-label">
                Total Study Hours
              </p>

              <h3 className="stat-value">
                {totalStudyHours}h
              </h3>

              <p className="stat-change positive">
                <TrendingUp size={14} />
                +18% this month
              </p>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon">
              <Target size={21} />
            </div>

            <div>
              <p className="stat-label">
                Average Progress
              </p>

              <h3 className="stat-value">
                {averageProgress}%
              </h3>

              <p className="stat-change">
                {getPerformanceLabel()}
              </p>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <p className="stat-label">
                Task Completion
              </p>

              <h3 className="stat-value">
                {taskCompletion}%
              </h3>

              <p className="stat-change">
                {completedTasks} of{" "}
                {tasks.length} completed
              </p>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon">
              <Flame size={21} />
            </div>

            <div>
              <p className="stat-label">
                Focus Sessions
              </p>

              <h3 className="stat-value">
                {pomodoroSessions}
              </h3>

              <p className="stat-change">
                {completedToday} completed today
              </p>
            </div>
          </div>
        </section>

        {/* Weekly Hours */}
        <section className="analytics-grid">
          <div className="content-card glass analytics-chart-card large">
            <div className="section-header">
              <div>
                <h2>Weekly Study Hours</h2>

                <p>
                  Your study time over the last
                  seven days.
                </p>
              </div>

              <div className="chart-total">
                <strong>
                  {totalWeeklyHours}h
                </strong>

                <span>This week</span>
              </div>
            </div>

            <div className="chart-container">
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart data={weeklyHours}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    opacity={0.1}
                  />

                  <XAxis
                    dataKey="day"
                    tick={{
                      fill: "currentColor",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fill: "currentColor",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      background:
                        "#0f172a",
                      border:
                        "1px solid rgba(255,255,255,0.1)",
                      borderRadius:
                        "12px",
                      color: "#fff",
                    }}
                  />

                  <Bar
                    dataKey="hours"
                    radius={[
                      6,
                      6,
                      0,
                      0,
                    ]}
                    fill="#3b82f6"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject Distribution */}
          <div className="content-card glass analytics-chart-card">
            <div className="section-header">
              <div>
                <h2>Study Distribution</h2>

                <p>
                  Hours by subject.
                </p>
              </div>

              <BookOpen size={21} />
            </div>

            <div className="pie-chart-wrapper">
              <ResponsiveContainer
                width="100%"
                height={250}
              >
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map(
                      (_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            PIE_COLORS[
                              index %
                                PIE_COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background:
                        "#0f172a",
                      border:
                        "1px solid rgba(255,255,255,0.1)",
                      borderRadius:
                        "12px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="subject-legend">
              {subjects.map(
                (subject, index) => (
                  <div
                    className="legend-item"
                    key={subject.id}
                  >
                    <span
                      className="legend-color"
                      style={{
                        background:
                          PIE_COLORS[
                            index %
                              PIE_COLORS.length
                          ],
                      }}
                    />

                    <span>
                      {subject.name}
                    </span>

                    <strong>
                      {subject.hours}h
                    </strong>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Subject Progress */}
        <section className="content-card glass">
          <div className="section-header">
            <div>
              <h2>Subject Progress</h2>

              <p>
                See how you're progressing in each
                subject.
              </p>
            </div>

            <Link
              to="/subjects"
              className="secondary-btn"
            >
              Manage Subjects
            </Link>
          </div>

          <div className="analytics-subject-list">
            {subjectData.length === 0 ? (
              <div className="empty-state compact">
                <BookOpen size={36} />

                <h3>
                  No subject data
                </h3>

                <p>
                  Add subjects to start
                  tracking analytics.
                </p>
              </div>
            ) : (
              subjectData.map(
                (subject, index) => (
                  <div
                    className="analytics-subject"
                    key={subject.name}
                  >
                    <div className="analytics-subject-info">
                      <div
                        className="analytics-subject-icon"
                        style={{
                          background: `${PIE_COLORS[
                            index %
                              PIE_COLORS.length
                          ]}20`,
                          color:
                            PIE_COLORS[
                              index %
                                PIE_COLORS.length
                            ],
                        }}
                      >
                        <BookOpen size={18} />
                      </div>

                      <div>
                        <h4>
                          {subject.name}
                        </h4>

                        <span>
                          {subject.hours} study
                          hours
                        </span>
                      </div>
                    </div>

                    <div className="analytics-progress">
                      <div className="progress-header">
                        <span>
                          Progress
                        </span>

                        <strong>
                          {subject.progress}%
                        </strong>
                      </div>

                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${subject.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </section>

        {/* Study Trend */}
        <section className="content-card glass analytics-chart-card">
          <div className="section-header">
            <div>
              <h2>Study Trend</h2>

              <p>
                Your study hours across recent weeks.
              </p>
            </div>

            <BarChart3 size={21} />
          </div>

          <div className="chart-container">
            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <LineChart data={studyTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.1}
                />

                <XAxis
                  dataKey="day"
                  tick={{
                    fill: "currentColor",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fill: "currentColor",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background:
                      "#0f172a",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    borderRadius:
                      "12px",
                    color: "#fff",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#8b5cf6",
                  }}
                  activeDot={{
                    r: 7,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Productivity Insights */}
        <section className="content-card glass">
          <div className="section-header">
            <div>
              <h2>Productivity Insights</h2>

              <p>
                A quick summary of your current study
                habits.
              </p>
            </div>

            <TrendingUp size={21} />
          </div>

          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">
                <Clock3 size={20} />
              </div>

              <div>
                <h3>
                  {totalWeeklyHours >= 20
                    ? "Strong study routine"
                    : "Build your study routine"}
                </h3>

                <p>
                  You studied{" "}
                  <strong>
                    {totalWeeklyHours} hours
                  </strong>{" "}
                  this week.
                </p>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon">
                <Target size={20} />
              </div>

              <div>
                <h3>
                  {averageProgress >= 70
                    ? "Good subject progress"
                    : "More revision needed"}
                </h3>

                <p>
                  Your average subject progress
                  is{" "}
                  <strong>
                    {averageProgress}%
                  </strong>
                  .
                </p>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <h3>
                  {taskCompletion >= 70
                    ? "Tasks under control"
                    : "Focus on pending tasks"}
                </h3>

                <p>
                  Your task completion rate is{" "}
                  <strong>
                    {taskCompletion}%
                  </strong>
                  .
                </p>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon">
                <Flame size={20} />
              </div>

              <div>
                <h3>
                  Keep your focus streak
                </h3>

                <p>
                  You've completed{" "}
                  <strong>
                    {pomodoroSessions}
                  </strong>{" "}
                  Pomodoro sessions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Analytics;