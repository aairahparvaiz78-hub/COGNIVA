import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Lightbulb,
  ListChecks,
  RefreshCw,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const defaultSubjects = [
  {
    name: "Data Structures",
    code: "CSE2006",
    progress: 72,
  },
  {
    name: "Operating Systems",
    code: "CSE2004",
    progress: 58,
  },
  {
    name: "Java Programming",
    code: "CSE2005",
    progress: 81,
  },
  {
    name: "Discrete Mathematics",
    code: "MAT2002",
    progress: 46,
  },
];

const defaultExams = [
  {
    name: "Java CAT 2",
    subject: "Java Programming",
    date: "2026-10-08",
  },
  {
    name: "Operating Systems CAT 2",
    subject: "Operating Systems",
    date: "2026-10-12",
  },
  {
    name: "Discrete Mathematics",
    subject: "Discrete Mathematics",
    date: "2026-10-18",
  },
];

function getStoredData(key, fallback) {
  try {
    const stored = localStorage.getItem(key);

    if (!stored) {
      return fallback;
    }

    return JSON.parse(stored);
  } catch {
    return fallback;
  }
}

function daysUntil(dateString) {
  const today = new Date();
  const target = new Date(`${dateString}T00:00:00`);

  today.setHours(0, 0, 0, 0);

  return Math.max(
    0,
    Math.ceil((target.getTime() - today.getTime()) / 86400000)
  );
}

function AIPlanner() {
  const subjects = useMemo(
    () => getStoredData("cogniva_subjects", defaultSubjects),
    []
  );

  const exams = useMemo(
    () => getStoredData("cogniva_exams", defaultExams),
    []
  );

  const [selectedSubjects, setSelectedSubjects] = useState(
    subjects.map((subject) => subject.name)
  );

  const [hoursPerDay, setHoursPerDay] = useState(4);
  const [daysPerWeek, setDaysPerWeek] = useState(6);
  const [difficulty, setDifficulty] = useState("Balanced");
  const [focus, setFocus] = useState("Exams");
  const [generated, setGenerated] = useState(false);

  const upcomingExam = [...exams]
    .filter((exam) => daysUntil(exam.date) >= 0)
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    )[0];

  const toggleSubject = (name) => {
    setSelectedSubjects((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  };

  const generatePlan = () => {
    setGenerated(true);
  };

  const resetPlan = () => {
    setGenerated(false);
    setHoursPerDay(4);
    setDaysPerWeek(6);
    setDifficulty("Balanced");
    setFocus("Exams");
    setSelectedSubjects(subjects.map((subject) => subject.name));
  };

  const planItems = useMemo(() => {
    const selected = subjects.filter((subject) =>
      selectedSubjects.includes(subject.name)
    );

    if (!selected.length) {
      return [];
    }

    const sorted = [...selected].sort(
      (a, b) => a.progress - b.progress
    );

    const first = sorted[0];
    const second = sorted[1] || sorted[0];
    const third = sorted[2] || sorted[0];

    return [
      {
        time: "08:00 - 09:00",
        subject: first.name,
        task: `Revise important ${first.name} concepts`,
        type: "Priority Revision",
      },
      {
        time: "10:30 - 11:30",
        subject: second.name,
        task: `Practice questions and solve examples`,
        type: "Practice",
      },
      {
        time: "15:00 - 16:00",
        subject: third.name,
        task: `Review notes and strengthen weak topics`,
        type: "Concept Building",
      },
      {
        time: "19:00 - 20:00",
        subject: upcomingExam?.subject || first.name,
        task: "Quick revision + active recall",
        type: "Exam Preparation",
      },
    ].slice(0, Math.max(2, Math.min(hoursPerDay, 4)));
  }, [subjects, selectedSubjects, hoursPerDay, upcomingExam]);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <div className="page-container">
          <div className="page-header">
            <div>
              <Link to="/dashboard" className="back-link">
                <ArrowLeft size={16} />
                Back to Dashboard
              </Link>

              <div className="page-title-row">
                <div className="page-icon ai-icon">
                  <Brain size={25} />
                </div>

                <div>
                  <h1>AI Study Planner</h1>
                  <p>
                    Create a personalized study plan based on your goals,
                    exams, subjects, and available time.
                  </p>
                </div>
              </div>
            </div>

            <Link to="/ai-assistant" className="secondary-btn">
              <Sparkles size={17} />
              AI Assistant
            </Link>
          </div>

          <div className="ai-planner-layout">
            {/* SETTINGS */}
            <section className="glass planner-settings-card">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">
                    <Wand2 size={14} />
                    Smart Planning
                  </span>

                  <h2>Tell Cogniva about your study goals</h2>
                  <p>
                    Choose what you want to study and how much time you have.
                  </p>
                </div>
              </div>

              <div className="planner-section">
                <label className="form-label">Subjects</label>

                <div className="subject-select-grid">
                  {subjects.map((subject) => {
                    const selected = selectedSubjects.includes(subject.name);

                    return (
                      <button
                        key={subject.name}
                        type="button"
                        className={`planner-subject ${
                          selected ? "selected" : ""
                        }`}
                        onClick={() => toggleSubject(subject.name)}
                      >
                        <div>
                          <strong>{subject.name}</strong>
                          <span>{subject.code}</span>
                        </div>

                        <div className="planner-subject-progress">
                          <span>{subject.progress}%</span>

                          {selected && (
                            <CheckCircle2 size={17} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="planner-controls">
                <div className="form-group">
                  <label className="form-label">
                    Study hours per day
                  </label>

                  <div className="range-value">
                    <Clock3 size={17} />
                    <strong>{hoursPerDay} hours</strong>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={hoursPerDay}
                    onChange={(e) =>
                      setHoursPerDay(Number(e.target.value))
                    }
                    className="planner-range"
                  />

                  <div className="range-labels">
                    <span>1 hr</span>
                    <span>8 hrs</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Study days per week
                  </label>

                  <div className="day-options">
                    {[3, 4, 5, 6, 7].map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={daysPerWeek === day ? "active" : ""}
                        onClick={() => setDaysPerWeek(day)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="planner-controls">
                <div className="form-group">
                  <label className="form-label">Difficulty</label>

                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="planner-select"
                  >
                    <option>Light</option>
                    <option>Balanced</option>
                    <option>Intensive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Main focus</label>

                  <select
                    value={focus}
                    onChange={(e) => setFocus(e.target.value)}
                    className="planner-select"
                  >
                    <option>Exams</option>
                    <option>Weak Subjects</option>
                    <option>Assignments</option>
                    <option>Balanced Progress</option>
                  </select>
                </div>
              </div>

              <div className="planner-goal-box">
                <Target size={20} />

                <div>
                  <strong>Your current goal</strong>
                  <p>
                    {upcomingExam
                      ? `${upcomingExam.name} is ${
                          daysUntil(upcomingExam.date)
                        } days away.`
                      : "Build a consistent study routine and improve your subject progress."}
                  </p>
                </div>
              </div>

              <div className="planner-actions">
                <button
                  type="button"
                  className="primary-btn"
                  onClick={generatePlan}
                  disabled={selectedSubjects.length === 0}
                >
                  <Sparkles size={18} />
                  Generate My Plan
                </button>

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={resetPlan}
                >
                  <RefreshCw size={17} />
                  Reset
                </button>
              </div>

              {selectedSubjects.length === 0 && (
                <p className="planner-warning">
                  Select at least one subject to generate a plan.
                </p>
              )}
            </section>

            {/* OUTPUT */}
            <section className="planner-output">
              {!generated ? (
                <div className="glass planner-empty">
                  <div className="empty-ai-icon">
                    <Brain size={34} />
                  </div>

                  <h2>Your personalized plan is waiting</h2>

                  <p>
                    Configure your subjects and study preferences, then let
                    Cogniva create a structured plan for you.
                  </p>

                  <div className="empty-benefits">
                    <div>
                      <CheckCircle2 size={17} />
                      <span>Prioritize weak subjects</span>
                    </div>

                    <div>
                      <CheckCircle2 size={17} />
                      <span>Prepare for upcoming exams</span>
                    </div>

                    <div>
                      <CheckCircle2 size={17} />
                      <span>Balance study and revision</span>
                    </div>

                    <div>
                      <CheckCircle2 size={17} />
                      <span>Build a consistent routine</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="glass plan-summary-card">
                    <div>
                      <span className="eyebrow">
                        <Sparkles size={14} />
                        Cogniva AI Plan
                      </span>

                      <h2>Your study plan is ready</h2>

                      <p>
                        A {difficulty.toLowerCase()} plan focused on{" "}
                        {focus.toLowerCase()} with {hoursPerDay} study
                        hours per day.
                      </p>
                    </div>

                    <div className="plan-summary-stats">
                      <div>
                        <strong>{hoursPerDay}h</strong>
                        <span>Daily</span>
                      </div>

                      <div>
                        <strong>{daysPerWeek}</strong>
                        <span>Days/week</span>
                      </div>

                      <div>
                        <strong>{selectedSubjects.length}</strong>
                        <span>Subjects</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass daily-plan-card">
                    <div className="card-header-row">
                      <div>
                        <h3>Today's Recommended Schedule</h3>
                        <p>
                          Follow these sessions and adjust them as needed.
                        </p>
                      </div>

                      <CalendarDays size={22} />
                    </div>

                    <div className="plan-timeline">
                      {planItems.map((item, index) => (
                        <div className="plan-item" key={`${item.subject}-${index}`}>
                          <div className="plan-time">
                            {item.time}
                          </div>

                          <div className="plan-dot">
                            <Clock3 size={15} />
                          </div>

                          <div className="plan-content">
                            <div className="plan-content-top">
                              <strong>{item.subject}</strong>

                              <span>{item.type}</span>
                            </div>

                            <p>{item.task}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="planner-insights-grid">
                    <div className="glass insight-card">
                      <div className="insight-icon">
                        <Target size={19} />
                      </div>

                      <div>
                        <h3>Priority</h3>
                        <p>
                          Focus more time on subjects with lower progress
                          before moving to revision.
                        </p>
                      </div>
                    </div>

                    <div className="glass insight-card">
                      <div className="insight-icon">
                        <Lightbulb size={19} />
                      </div>

                      <div>
                        <h3>Study Tip</h3>
                        <p>
                          Use active recall and practice questions instead
                          of only rereading your notes.
                        </p>
                      </div>
                    </div>

                    <div className="glass insight-card">
                      <div className="insight-icon">
                        <ListChecks size={19} />
                      </div>

                      <div>
                        <h3>Daily Target</h3>
                        <p>
                          Complete your priority session first, then use
                          remaining time for revision.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="planner-next-actions">
                    <Link to="/tasks" className="primary-btn">
                      <ListChecks size={17} />
                      Add Tasks
                    </Link>

                    <Link to="/pomodoro" className="secondary-btn">
                      <Clock3 size={17} />
                      Start Pomodoro
                    </Link>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AIPlanner;