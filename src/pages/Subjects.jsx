import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  BookOpen,
  Clock3,
  Target,
  TrendingUp,
  Trash2,
  Edit3,
  X,
  CheckCircle2,
  BarChart3,
  ArrowLeft,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

const DEFAULT_SUBJECTS = [
  {
    id: 1,
    name: "Data Structures",
    code: "CSE2006",
    color: "#3b82f6",
    progress: 72,
    hours: 18,
    target: 25,
  },
  {
    id: 2,
    name: "Operating Systems",
    code: "CSE2004",
    color: "#8b5cf6",
    progress: 58,
    hours: 14,
    target: 24,
  },
  {
    id: 3,
    name: "Java Programming",
    code: "CSE2005",
    color: "#22c55e",
    progress: 81,
    hours: 21,
    target: 26,
  },
  {
    id: 4,
    name: "Discrete Mathematics",
    code: "MAT2002",
    color: "#f59e0b",
    progress: 46,
    hours: 10,
    target: 22,
  },
];

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
];

function Subjects() {
  const [subjects, setSubjects] = useState(() => {
    try {
      const saved = localStorage.getItem("cogniva_subjects");

      if (saved) {
        return JSON.parse(saved);
      }

      return DEFAULT_SUBJECTS;
    } catch {
      return DEFAULT_SUBJECTS;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    progress: 0,
    hours: 0,
    target: 20,
    color: "#3b82f6",
  });

  useEffect(() => {
    localStorage.setItem("cogniva_subjects", JSON.stringify(subjects));
  }, [subjects]);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const searchText = search.toLowerCase();

      return (
        subject.name.toLowerCase().includes(searchText) ||
        subject.code.toLowerCase().includes(searchText)
      );
    });
  }, [subjects, search]);

  const totalHours = subjects.reduce(
    (total, subject) => total + Number(subject.hours || 0),
    0
  );

  const averageProgress =
    subjects.length > 0
      ? Math.round(
          subjects.reduce(
            (total, subject) => total + Number(subject.progress || 0),
            0
          ) / subjects.length
        )
      : 0;

  const totalTargetHours = subjects.reduce(
    (total, subject) => total + Number(subject.target || 0),
    0
  );

  const openAddModal = () => {
    setEditingSubject(null);

    setFormData({
      name: "",
      code: "",
      progress: 0,
      hours: 0,
      target: 20,
      color: "#3b82f6",
    });

    setShowModal(true);
  };

  const openEditModal = (subject) => {
    setEditingSubject(subject);

    setFormData({
      name: subject.name,
      code: subject.code,
      progress: subject.progress,
      hours: subject.hours,
      target: subject.target,
      color: subject.color,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSubject(null);
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

    if (!formData.name.trim()) {
      return;
    }

    const newSubject = {
      id: editingSubject ? editingSubject.id : Date.now(),
      name: formData.name.trim(),
      code: formData.code.trim().toUpperCase(),
      progress: Math.min(
        100,
        Math.max(0, Number(formData.progress) || 0)
      ),
      hours: Math.max(0, Number(formData.hours) || 0),
      target: Math.max(1, Number(formData.target) || 1),
      color: formData.color,
    };

    if (editingSubject) {
      setSubjects((previous) =>
        previous.map((subject) =>
          subject.id === editingSubject.id ? newSubject : subject
        )
      );
    } else {
      setSubjects((previous) => [...previous, newSubject]);
    }

    closeModal();
  };

  const deleteSubject = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmed) {
      return;
    }

    setSubjects((previous) =>
      previous.filter((subject) => subject.id !== id)
    );
  };

  const getProgressLabel = (progress) => {
    if (progress >= 80) return "Excellent";
    if (progress >= 60) return "Good";
    if (progress >= 40) return "On Track";
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

            <h1 className="page-title">Subjects</h1>

            <p className="page-subtitle">
              Manage your subjects and track your study progress.
            </p>
          </div>

          <button className="primary-btn" onClick={openAddModal}>
            <Plus size={18} />
            Add Subject
          </button>
        </div>

        {/* Statistics */}
        <section className="stats-grid">
          <div className="stat-card glass">
            <div className="stat-icon">
              <BookOpen size={21} />
            </div>

            <div>
              <p className="stat-label">Total Subjects</p>
              <h3 className="stat-value">{subjects.length}</h3>
              <p className="stat-change">
                Active subjects
              </p>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon">
              <Clock3 size={21} />
            </div>

            <div>
              <p className="stat-label">Study Hours</p>
              <h3 className="stat-value">{totalHours}h</h3>
              <p className="stat-change">
                Across all subjects
              </p>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon">
              <Target size={21} />
            </div>

            <div>
              <p className="stat-label">Average Progress</p>
              <h3 className="stat-value">{averageProgress}%</h3>
              <p className="stat-change">
                Overall completion
              </p>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon">
              <TrendingUp size={21} />
            </div>

            <div>
              <p className="stat-label">Study Target</p>
              <h3 className="stat-value">{totalTargetHours}h</h3>
              <p className="stat-change">
                Total planned hours
              </p>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="content-card glass">
          <div className="section-header">
            <div>
              <h2>Your Subjects</h2>
              <p>
                Keep track of your progress for every subject.
              </p>
            </div>

            <div className="search-box">
              <input
                type="text"
                placeholder="Search subjects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Subject Cards */}
          {filteredSubjects.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={45} />

              <h3>No subjects found</h3>

              <p>
                {search
                  ? "Try a different search."
                  : "Add your first subject to start tracking your progress."}
              </p>

              {!search && (
                <button
                  className="primary-btn"
                  onClick={openAddModal}
                >
                  <Plus size={18} />
                  Add Subject
                </button>
              )}
            </div>
          ) : (
            <div className="subjects-grid">
              {filteredSubjects.map((subject) => (
                <div
                  className="subject-card"
                  key={subject.id}
                >
                  {/* Top */}
                  <div className="subject-card-top">
                    <div
                      className="subject-icon"
                      style={{
                        background: `${subject.color}20`,
                        color: subject.color,
                      }}
                    >
                      <BookOpen size={22} />
                    </div>

                    <div className="subject-actions">
                      <button
                        className="icon-btn"
                        title="Edit subject"
                        onClick={() =>
                          openEditModal(subject)
                        }
                      >
                        <Edit3 size={17} />
                      </button>

                      <button
                        className="icon-btn danger"
                        title="Delete subject"
                        onClick={() =>
                          deleteSubject(subject.id)
                        }
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>

                  {/* Subject Name */}
                  <div className="subject-info">
                    <h3>{subject.name}</h3>

                    <span className="subject-code">
                      {subject.code || "NO CODE"}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="subject-progress">
                    <div className="progress-header">
                      <span>Progress</span>

                      <strong>
                        {subject.progress}%
                      </strong>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${subject.progress}%`,
                          background: subject.color,
                        }}
                      />
                    </div>

                    <div className="progress-footer">
                      <span>
                        {getProgressLabel(subject.progress)}
                      </span>

                      <span>
                        {subject.hours} / {subject.target} hrs
                      </span>
                    </div>
                  </div>

                  {/* Bottom stats */}
                  <div className="subject-mini-stats">
                    <div>
                      <Clock3 size={16} />
                      <span>
                        <strong>{subject.hours}h</strong>
                        studied
                      </span>
                    </div>

                    <div>
                      <BarChart3 size={16} />
                      <span>
                        <strong>{subject.target}h</strong>
                        target
                      </span>
                    </div>
                  </div>

                  {subject.progress >= 80 && (
                    <div className="subject-success">
                      <CheckCircle2 size={15} />
                      Great progress!
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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
                  {editingSubject
                    ? "Edit Subject"
                    : "Add Subject"}
                </h2>

                <p>
                  {editingSubject
                    ? "Update your subject details."
                    : "Add a subject to your study workspace."}
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
              {/* Name */}
              <div className="form-group">
                <label htmlFor="subject-name">
                  Subject Name
                </label>

                <input
                  id="subject-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Data Structures"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Code */}
              <div className="form-group">
                <label htmlFor="subject-code">
                  Subject Code
                </label>

                <input
                  id="subject-code"
                  name="code"
                  type="text"
                  placeholder="e.g. CSE2006"
                  value={formData.code}
                  onChange={handleChange}
                />
              </div>

              {/* Two columns */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="subject-progress">
                    Progress (%)
                  </label>

                  <input
                    id="subject-progress"
                    name="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject-hours">
                    Hours Studied
                  </label>

                  <input
                    id="subject-hours"
                    name="hours"
                    type="number"
                    min="0"
                    step="0.5"
                    value={formData.hours}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Target */}
              <div className="form-group">
                <label htmlFor="subject-target">
                  Target Study Hours
                </label>

                <input
                  id="subject-target"
                  name="target"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.target}
                  onChange={handleChange}
                />
              </div>

              {/* Color */}
              <div className="form-group">
                <label>Subject Color</label>

                <div className="color-options">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${
                        formData.color === color
                          ? "selected"
                          : ""
                      }`}
                      style={{
                        background: color,
                      }}
                      onClick={() =>
                        setFormData((previous) => ({
                          ...previous,
                          color,
                        }))
                      }
                      aria-label={`Choose ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Buttons */}
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
                  {editingSubject ? (
                    <>
                      <CheckCircle2 size={18} />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      Add Subject
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

export default Subjects;