import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  CalendarDays,
  Clock3,
  BookOpen,
  Target,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

const DEFAULT_EXAMS = [
  {
    id: 1,
    name: "Java CAT 2",
    subject: "Java Programming",
    date: "2026-10-08",
    time: "09:00",
    syllabus: "Exception Handling, Multithreading, Arrays and Lists",
    progress: 72,
  },
  {
    id: 2,
    name: "Operating Systems CAT 2",
    subject: "Operating Systems",
    date: "2026-10-12",
    time: "10:00",
    syllabus: "Memory Management, Virtual Memory, Scheduling",
    progress: 58,
  },
  {
    id: 3,
    name: "Discrete Mathematics",
    subject: "Discrete Mathematics",
    date: "2026-10-18",
    time: "14:00",
    syllabus: "Graphs, Lattices, Boolean Algebra",
    progress: 46,
  },
];

function Exams() {
  const [exams, setExams] = useState(() => {
    try {
      const saved = localStorage.getItem("cogniva_exams");

      return saved ? JSON.parse(saved) : DEFAULT_EXAMS;
    } catch {
      return DEFAULT_EXAMS;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [editingExam, setEditingExam] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    date: "",
    time: "09:00",
    syllabus: "",
    progress: 0,
  });

  useEffect(() => {
    localStorage.setItem(
      "cogniva_exams",
      JSON.stringify(exams)
    );
  }, [exams]);

  const sortedExams = useMemo(() => {
    return [...exams].sort(
      (a, b) =>
        new Date(`${a.date}T${a.time || "00:00"}`) -
        new Date(`${b.date}T${b.time || "00:00"}`)
    );
  }, [exams]);

  const today = new Date();

  const upcomingExams = exams.filter(
    (exam) =>
      new Date(`${exam.date}T${exam.time || "00:00"}`) >=
      today
  );

  const averageProgress =
    exams.length > 0
      ? Math.round(
          exams.reduce(
            (total, exam) =>
              total + Number(exam.progress || 0),
            0
          ) / exams.length
        )
      : 0;

  const openAddModal = () => {
    setEditingExam(null);

    setFormData({
      name: "",
      subject: "",
      date: "",
      time: "09:00",
      syllabus: "",
      progress: 0,
    });

    setShowModal(true);
  };

  const openEditModal = (exam) => {
    setEditingExam(exam);

    setFormData({
      name: exam.name,
      subject: exam.subject,
      date: exam.date,
      time: exam.time || "09:00",
      syllabus: exam.syllabus || "",
      progress: exam.progress || 0,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingExam(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.subject.trim() ||
      !formData.date
    ) {
      return;
    }

    const exam = {
      id: editingExam
        ? editingExam.id
        : Date.now(),
      name: formData.name.trim(),
      subject: formData.subject.trim(),
      date: formData.date,
      time: formData.time,
      syllabus: formData.syllabus.trim(),
      progress: Math.min(
        100,
        Math.max(0, Number(formData.progress) || 0)
      ),
    };

    if (editingExam) {
      setExams((previous) =>
        previous.map((item) =>
          item.id === editingExam.id
            ? exam
            : item
        )
      );
    } else {
      setExams((previous) => [
        ...previous,
        exam,
      ]);
    }

    closeModal();
  };

  const deleteExam = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this exam?"
    );

    if (!confirmed) return;

    setExams((previous) =>
      previous.filter((exam) => exam.id !== id)
    );
  };

  const getDaysLeft = (date, time = "00:00") => {
    const examDate = new Date(
      `${date}T${time}`
    );

    const now = new Date();

    const difference =
      examDate.getTime() - now.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  const getCountdownText = (exam) => {
    const days = getDaysLeft(
      exam.date,
      exam.time
    );

    if (days < 0) {
      return "Completed";
    }

    if (days === 0) {
      return "Today";
    }

    if (days === 1) {
      return "Tomorrow";
    }

    return `${days} days left`;
  };

  const getCountdownClass = (exam) => {
    const days = getDaysLeft(
      exam.date,
      exam.time
    );

    if (days < 0) return "completed";

    if (days <= 3) return "urgent";

    if (days <= 7) return "soon";

    return "normal";
  };

  const formatExamDate = (date) => {
    return new Date(
      `${date}T12:00:00`
    ).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
              Exams
            </h1>

            <p className="page-subtitle">
              Keep track of your exams, syllabus, and
              preparation progress.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={openAddModal}
          >
            <Plus size={18} />
            Add Exam
          </button>
        </div>

        {/* Stats */}
        <section className="stats-grid">
          <div className="stat-card glass">
            <div className="stat-icon">
              <CalendarDays size={21} />
            </div>

            <div>
              <p className="stat-label">
                Total Exams
              </p>

              <h3 className="stat-value">
                {exams.length}
              </h3>

              <p className="stat-change">
                All scheduled exams
              </p>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon">
              <Clock3 size={21} />
            </div>

            <div>
              <p className="stat-label">
                Upcoming
              </p>

              <h3 className="stat-value">
                {upcomingExams.length}
              </h3>

              <p className="stat-change">
                Exams remaining
              </p>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon">
              <Target size={21} />
            </div>

            <div>
              <p className="stat-label">
                Avg. Preparation
              </p>

              <h3 className="stat-value">
                {averageProgress}%
              </h3>

              <p className="stat-change">
                Overall exam progress
              </p>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon">
              <BookOpen size={21} />
            </div>

            <div>
              <p className="stat-label">
                Next Exam
              </p>

              <h3 className="stat-value exam-stat">
                {sortedExams.length > 0
                  ? getCountdownText(
                      sortedExams[0]
                    )
                  : "None"}
              </h3>

              <p className="stat-change">
                Based on exam date
              </p>
            </div>
          </div>
        </section>

        {/* Exams */}
        <section className="content-card glass">
          <div className="section-header">
            <div>
              <h2>Your Exams</h2>

              <p>
                Plan your preparation before every
                examination.
              </p>
            </div>
          </div>

          {sortedExams.length === 0 ? (
            <div className="empty-state">
              <CalendarDays size={45} />

              <h3>No exams added</h3>

              <p>
                Add your first exam to start planning
                your preparation.
              </p>

              <button
                className="primary-btn"
                onClick={openAddModal}
              >
                <Plus size={18} />
                Add Exam
              </button>
            </div>
          ) : (
            <div className="exams-list">
              {sortedExams.map((exam) => {
                const daysLeft = getDaysLeft(
                  exam.date,
                  exam.time
                );

                return (
                  <div
                    className="exam-card"
                    key={exam.id}
                  >
                    {/* Date */}
                    <div className="exam-date-box">
                      <CalendarDays size={21} />

                      <strong>
                        {new Date(
                          `${exam.date}T12:00:00`
                        ).getDate()}
                      </strong>

                      <span>
                        {MONTH_SHORT(
                          exam.date
                        )}
                      </span>
                    </div>

                    {/* Main Info */}
                    <div className="exam-main">
                      <div className="exam-heading">
                        <div>
                          <h3>{exam.name}</h3>

                          <span className="exam-subject">
                            <BookOpen size={14} />
                            {exam.subject}
                          </span>
                        </div>

                        <span
                          className={`exam-countdown ${getCountdownClass(
                            exam
                          )}`}
                        >
                          {daysLeft >= 0 ? (
                            <Clock3 size={14} />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}

                          {getCountdownText(exam)}
                        </span>
                      </div>

                      <div className="exam-details">
                        <span>
                          <CalendarDays size={14} />
                          {formatExamDate(
                            exam.date
                          )}
                        </span>

                        <span>
                          <Clock3 size={14} />
                          {exam.time}
                        </span>
                      </div>

                      {exam.syllabus && (
                        <div className="exam-syllabus">
                          <strong>
                            Syllabus:
                          </strong>

                          <span>
                            {exam.syllabus}
                          </span>
                        </div>
                      )}

                      {/* Progress */}
                      <div className="exam-progress">
                        <div className="progress-header">
                          <span>
                            Preparation Progress
                          </span>

                          <strong>
                            {exam.progress}%
                          </strong>
                        </div>

                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${exam.progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="exam-actions">
                      <button
                        className="icon-btn"
                        title="Edit exam"
                        onClick={() =>
                          openEditModal(exam)
                        }
                      >
                        <Edit3 size={17} />
                      </button>

                      <button
                        className="icon-btn danger"
                        title="Delete exam"
                        onClick={() =>
                          deleteExam(exam.id)
                        }
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Preparation Tip */}
        <section className="content-card glass exam-tip">
          <div className="exam-tip-icon">
            <AlertCircle size={22} />
          </div>

          <div>
            <h3>Exam preparation tip</h3>

            <p>
              Break your syllabus into smaller study
              sessions and use the Pomodoro timer to
              maintain consistent focus.
            </p>
          </div>

          <Link
            to="/pomodoro"
            className="secondary-btn"
          >
            Start Focus Session
          </Link>
        </section>
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="modal glass">
            <div className="modal-header">
              <div>
                <h2>
                  {editingExam
                    ? "Edit Exam"
                    : "Add Exam"}
                </h2>

                <p>
                  Add exam details and track your
                  preparation.
                </p>
              </div>

              <button
                className="icon-btn"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Exam Name */}
              <div className="form-group">
                <label htmlFor="exam-name">
                  Exam Name
                </label>

                <input
                  id="exam-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Java CAT 2"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="exam-subject">
                  Subject
                </label>

                <input
                  id="exam-subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Java Programming"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date + Time */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="exam-date">
                    Exam Date
                  </label>

                  <input
                    id="exam-date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exam-time">
                    Exam Time
                  </label>

                  <input
                    id="exam-time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Syllabus */}
              <div className="form-group">
                <label htmlFor="exam-syllabus">
                  Syllabus
                </label>

                <textarea
                  id="exam-syllabus"
                  name="syllabus"
                  rows="4"
                  placeholder="Enter important topics or chapters..."
                  value={formData.syllabus}
                  onChange={handleChange}
                />
              </div>

              {/* Progress */}
              <div className="form-group">
                <label htmlFor="exam-progress">
                  Preparation Progress (%)
                </label>

                <input
                  id="exam-progress"
                  name="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleChange}
                />
              </div>

              {/* Actions */}
              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  {editingExam ? (
                    <>
                      <CheckCircle2 size={18} />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      Add Exam
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function MONTH_SHORT(date) {
  return new Date(
    `${date}T12:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
  });
}

export default Exams;