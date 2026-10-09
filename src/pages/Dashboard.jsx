import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Brain,
  CalendarDays,
  Check,
  Clock3,
  Flame,
  Plus,
  Sparkles,
  Target,
  Timer,
  RotateCcw,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const initialTasks = [
  { id: 1, title: "Complete Java assignment", subject: "Java", time: "Today · 6:00 PM", priority: "High", done: false },
  { id: 2, title: "Revise Graph Theory", subject: "Discrete Mathematics", time: "Today · 8:00 PM", priority: "Medium", done: false },
  { id: 3, title: "Practice OS questions", subject: "Operating Systems", time: "Tomorrow · 10:00 AM", priority: "Low", done: true },
];

function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("cogniva_current_user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const firstName = user.name?.trim().split(/\s+/)[0] || "there";
  const completedTasks = tasks.filter((task) => task.done).length;
  const now = new Date();
  const hour = now.getHours();
  const period = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
  const todayLabel = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now).toUpperCase();
  const javaExamDate = new Date(now.getFullYear(), 9, 8, 9, 0);
  if (javaExamDate < now) javaExamDate.setFullYear(javaExamDate.getFullYear() + 1);
  const daysUntilJavaExam = Math.ceil((javaExamDate - now) / 86_400_000);
  const javaExamCountdown = daysUntilJavaExam === 0
    ? "Today"
    : daysUntilJavaExam === 1
      ? "Tomorrow"
      : `${daysUntilJavaExam} days`;

  const toggleTask = (id) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  };

  const stats = [
    { icon: Check, label: "Tasks for today", value: `${completedTasks} / 5`, detail: "One step at a time" },
    { icon: Clock3, label: "Study time", value: "4.2h", detail: "+18% from last week" },
    { icon: Flame, label: "Study streak", value: "12 days", detail: "A lovely rhythm" },
    { icon: Target, label: "Weekly goal", value: "72%", detail: "3.5 hours to go" },
  ];

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="page-container dashboard-page">
          <header className="dashboard-page-header">
            <div>
              <span className="dashboard-overline">YOUR STUDY SPACE · {todayLabel}</span>
              <h1>Good {period}, {firstName}<span className="greeting-mark">.</span></h1>
              <p>A clear mind begins with one clear next step.</p>
            </div>
            <Link to="/tasks" className="dashboard-add-task"><Plus size={16} /> Add a task</Link>
          </header>

          <section className="dashboard-welcome">
            <div className="welcome-copy">
              <span className="welcome-kicker"><Sparkles size={13} /> YOUR PACE, YOUR PLAN</span>
              <h2>Make a little progress.<br /><em>Let it be enough.</em></h2>
              <p>You’ve shown up for your studies 4 days this week. Keep the next step simple and steady.</p>
              <Link to="/ai-planner" className="welcome-link">Plan your next session <ArrowRight size={15} /></Link>
            </div>
            <div className="welcome-mark" aria-hidden="true"><span>✳</span><i /><b /></div>
            <div className="welcome-foot"><span>WEEKLY MOMENTUM</span><span>04 / 05 DAYS</span></div>
          </section>

          <section className="dashboard-stats" aria-label="Study overview">
            {stats.map(({ icon: Icon, label, value, detail }, index) => (
              <article className="dashboard-stat glass" key={label}>
                <div className={`dashboard-stat-icon stat-tone-${index}`}><Icon size={17} /></div>
                <span className="dashboard-stat-label">{label}</span>
                <strong>{value}</strong>
                <small>{detail}</small>
              </article>
            ))}
          </section>

          <section className="dashboard-content-grid">
            <article className="workspace-card glass">
              <div className="workspace-card-heading">
                <div><span className="workspace-eyebrow">YOUR NEXT STEPS</span><h2>Today’s focus</h2></div>
                <Link to="/tasks" className="dashboard-view-link">All tasks <ArrowUpRight size={14} /></Link>
              </div>
              <div className="dashboard-task-list">
                {tasks.map((task) => (
                  <div className={`dashboard-task ${task.done ? "is-done" : ""}`} key={task.id}>
                    <button type="button" className="dashboard-task-check" onClick={() => toggleTask(task.id)} aria-label={`${task.done ? "Mark incomplete" : "Complete"}: ${task.title}`}>
                      {task.done && <Check size={13} />}
                    </button>
                    <div className="dashboard-task-copy"><strong>{task.title}</strong><span>{task.subject} <i>·</i> {task.time}</span></div>
                    <span className={`dashboard-priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                  </div>
                ))}
              </div>
              <Link to="/tasks" className="dashboard-add-row"><Plus size={14} /> Add another task</Link>
            </article>

            <article className="study-coach-card">
              <div className="coach-top"><span className="coach-icon"><Brain size={18} /></span><span>COGNIVA STUDY COACH</span></div>
              <h2>Let’s make the next hour count.</h2>
              <p>Your Discrete Mathematics exam is coming up. Start with a short review, then try a few questions from memory.</p>
              <Link to="/ai-assistant" className="coach-link">Ask your study coach <ArrowRight size={15} /></Link>
              <div className="coach-decoration" aria-hidden="true">✳</div>
            </article>
          </section>

          <section className="dashboard-bottom-grid">
            <article className="workspace-card glass upcoming-card">
              <div className="workspace-card-heading">
                <div><span className="workspace-eyebrow">KEEP AHEAD</span><h2>Coming up</h2></div>
                <Link to="/exams" className="dashboard-view-link">All exams <ArrowUpRight size={14} /></Link>
              </div>
              <div className="upcoming-exam"><span className="exam-date"><b>08</b><small>OCT</small></span><span className="exam-name"><strong>Java CAT 2</strong><small>9:00 AM</small></span><span className="exam-countdown">{javaExamCountdown}</span></div>
              <div className="upcoming-exam"><span className="exam-date"><b>15</b><small>OCT</small></span><span className="exam-name"><strong>Discrete Mathematics</strong><small>Thursday · 10:30 AM</small></span><span className="exam-countdown">7 days</span></div>
            </article>

            <article className="workspace-card glass shortcuts-card">
              <div className="workspace-card-heading"><div><span className="workspace-eyebrow">PICK UP WHERE YOU LEFT OFF</span><h2>Quick paths</h2></div></div>
              <div className="dashboard-shortcuts">
                <Link to="/pomodoro"><Timer size={16} /><span>Focus session</span><ArrowUpRight size={13} /></Link>
                <Link to="/recall"><RotateCcw size={16} /><span>Daily Recall Ritual</span><ArrowUpRight size={13} /></Link>
                <Link to="/calendar"><CalendarDays size={16} /><span>Study calendar</span><ArrowUpRight size={13} /></Link>
                <Link to="/subjects"><BookOpen size={16} /><span>My subjects</span><ArrowUpRight size={13} /></Link>
                <Link to="/analytics"><BarChart3 size={16} /><span>Progress</span><ArrowUpRight size={13} /></Link>
              </div>
            </article>
          </section>
          <footer className="dashboard-page-footer"><span>Small steps still move you forward.</span><span>✳ &nbsp; COGNIVA</span></footer>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
