import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarDays,
  Clock3,
  BookOpen,
  X,
  Trash2,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DEFAULT_EVENTS = [
  {
    id: 1,
    title: "Data Structures Assignment",
    type: "task",
    date: "2026-10-02",
    time: "10:00",
    subject: "Data Structures",
  },
  {
    id: 2,
    title: "Operating Systems Revision",
    type: "study",
    date: "2026-10-03",
    time: "18:00",
    subject: "Operating Systems",
  },
  {
    id: 3,
    title: "Java CAT 2",
    type: "exam",
    date: "2026-10-08",
    time: "09:00",
    subject: "Java Programming",
  },
];

function formatDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
}

function CalendarPage() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem("cogniva_calendar_events");

      return saved ? JSON.parse(saved) : DEFAULT_EVENTS;
    } catch {
      return DEFAULT_EVENTS;
    }
  });

  const [selectedDate, setSelectedDate] = useState(
    formatDateKey(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )
  );

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    type: "study",
    date: selectedDate,
    time: "18:00",
    subject: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "cogniva_calendar_events",
      JSON.stringify(events)
    );
  }, [events]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const calendarDays = useMemo(() => {
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [firstDay, daysInMonth]);

  const selectedEvents = events
    .filter((event) => event.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  const monthEvents = events.filter((event) => {
    return event.date.startsWith(
      `${year}-${String(month + 1).padStart(2, "0")}`
    );
  });

  const goPreviousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const goNextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const goToday = () => {
    setCurrentDate(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );

    setSelectedDate(
      formatDateKey(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )
    );
  };

  const handleDayClick = (day) => {
    if (!day) return;

    const dateKey = formatDateKey(year, month, day);

    setSelectedDate(dateKey);
  };

  const openAddModal = () => {
    setFormData({
      title: "",
      type: "study",
      date: selectedDate,
      time: "18:00",
      subject: "",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    const newEvent = {
      id: Date.now(),
      title: formData.title.trim(),
      type: formData.type,
      date: formData.date,
      time: formData.time,
      subject: formData.subject.trim(),
    };

    setEvents((previous) => [
      ...previous,
      newEvent,
    ]);

    setSelectedDate(formData.date);

    const eventDate = new Date(
      `${formData.date}T12:00:00`
    );

    setCurrentDate(
      new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        1
      )
    );

    closeModal();
  };

  const deleteEvent = (id) => {
    setEvents((previous) =>
      previous.filter((event) => event.id !== id)
    );
  };

  const isToday = (day) => {
    if (!day) return false;

    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };

  const getDateEvents = (day) => {
    if (!day) return [];

    const dateKey = formatDateKey(year, month, day);

    return events.filter(
      (event) => event.date === dateKey
    );
  };

  const getEventColor = (type) => {
    if (type === "exam") return "#ef4444";
    if (type === "task") return "#3b82f6";
    return "#8b5cf6";
  };

  const getEventLabel = (type) => {
    if (type === "exam") return "Exam";
    if (type === "task") return "Task";
    return "Study";
  };

  const formattedSelectedDate = new Date(
    `${selectedDate}T12:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
              Study Calendar
            </h1>

            <p className="page-subtitle">
              Organize exams, tasks, and study sessions.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={openAddModal}
          >
            <Plus size={18} />
            Add Event
          </button>
        </div>

        {/* Calendar */}
        <section className="calendar-layout">
          <div className="content-card glass calendar-card">
            {/* Calendar Header */}
            <div className="calendar-header">
              <div className="calendar-title">
                <CalendarDays size={22} />

                <h2>
                  {MONTHS[month]} {year}
                </h2>
              </div>

              <div className="calendar-controls">
                <button
                  className="secondary-btn small"
                  onClick={goToday}
                >
                  Today
                </button>

                <button
                  className="icon-btn"
                  onClick={goPreviousMonth}
                  title="Previous month"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  className="icon-btn"
                  onClick={goNextMonth}
                  title="Next month"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="calendar-legend">
              <div>
                <span
                  className="legend-dot"
                  style={{
                    background: "#3b82f6",
                  }}
                />
                Tasks
              </div>

              <div>
                <span
                  className="legend-dot"
                  style={{
                    background: "#8b5cf6",
                  }}
                />
                Study
              </div>

              <div>
                <span
                  className="legend-dot"
                  style={{
                    background: "#ef4444",
                  }}
                />
                Exams
              </div>
            </div>

            {/* Weekdays */}
            <div className="calendar-weekdays">
              {WEEKDAYS.map((day) => (
                <div key={day}>
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="calendar-grid">
              {calendarDays.map((day, index) => {
                const dateKey = day
                  ? formatDateKey(year, month, day)
                  : null;

                const dayEvents = day
                  ? getDateEvents(day)
                  : [];

                const selected =
                  dateKey === selectedDate;

                return (
                  <button
                    key={`${dateKey}-${index}`}
                    type="button"
                    className={`calendar-day ${
                      !day ? "empty" : ""
                    } ${selected ? "selected" : ""} ${
                      isToday(day) ? "today" : ""
                    }`}
                    onClick={() =>
                      handleDayClick(day)
                    }
                    disabled={!day}
                  >
                    {day && (
                      <>
                        <span className="day-number">
                          {day}
                        </span>

                        <div className="day-events">
                          {dayEvents
                            .slice(0, 3)
                            .map((event) => (
                              <span
                                key={event.id}
                                className="calendar-event-dot"
                                style={{
                                  background:
                                    getEventColor(
                                      event.type
                                    ),
                                }}
                                title={event.title}
                              />
                            ))}

                          {dayEvents.length > 3 && (
                            <span className="more-events">
                              +{dayEvents.length - 3}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Day */}
          <aside className="content-card glass selected-day-card">
            <div className="selected-day-header">
              <div>
                <p className="eyebrow">
                  Selected Day
                </p>

                <h2>{formattedSelectedDate}</h2>
              </div>

              <CalendarDays size={24} />
            </div>

            <div className="selected-day-actions">
              <button
                className="primary-btn full-width"
                onClick={openAddModal}
              >
                <Plus size={18} />
                Add Event
              </button>
            </div>

            <div className="selected-events">
              {selectedEvents.length === 0 ? (
                <div className="empty-events">
                  <CalendarDays size={36} />

                  <h3>No events</h3>

                  <p>
                    Nothing scheduled for this day.
                  </p>
                </div>
              ) : (
                selectedEvents.map((event) => (
                  <div
                    className="event-item"
                    key={event.id}
                  >
                    <div
                      className="event-color"
                      style={{
                        background:
                          getEventColor(event.type),
                      }}
                    />

                    <div className="event-content">
                      <div className="event-top">
                        <span
                          className="event-type"
                          style={{
                            color:
                              getEventColor(
                                event.type
                              ),
                          }}
                        >
                          {getEventLabel(event.type)}
                        </span>

                        <button
                          className="event-delete"
                          onClick={() =>
                            deleteEvent(event.id)
                          }
                          title="Delete event"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <h4>{event.title}</h4>

                      <div className="event-meta">
                        <span>
                          <Clock3 size={14} />
                          {event.time}
                        </span>

                        {event.subject && (
                          <span>
                            <BookOpen size={14} />
                            {event.subject}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        </section>

        {/* Month Summary */}
        <section className="stats-grid calendar-stats">
          <div className="stat-card glass">
            <div className="stat-icon">
              <CalendarDays size={21} />
            </div>

            <div>
              <p className="stat-label">
                Monthly Events
              </p>

              <h3 className="stat-value">
                {monthEvents.length}
              </h3>

              <p className="stat-change">
                Scheduled this month
              </p>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon">
              <BookOpen size={21} />
            </div>

            <div>
              <p className="stat-label">
                Study Sessions
              </p>

              <h3 className="stat-value">
                {
                  monthEvents.filter(
                    (event) =>
                      event.type === "study"
                  ).length
                }
              </h3>

              <p className="stat-change">
                Planned study sessions
              </p>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <p className="stat-label">
                Tasks
              </p>

              <h3 className="stat-value">
                {
                  monthEvents.filter(
                    (event) =>
                      event.type === "task"
                  ).length
                }
              </h3>

              <p className="stat-change">
                Deadlines this month
              </p>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon">
              <Clock3 size={21} />
            </div>

            <div>
              <p className="stat-label">
                Exams
              </p>

              <h3 className="stat-value">
                {
                  monthEvents.filter(
                    (event) =>
                      event.type === "exam"
                  ).length
                }
              </h3>

              <p className="stat-change">
                Upcoming exams
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Add Event Modal */}
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
                <h2>Add Calendar Event</h2>

                <p>
                  Add a task, study session, or exam.
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
              {/* Title */}
              <div className="form-group">
                <label htmlFor="event-title">
                  Event Title
                </label>

                <input
                  id="event-title"
                  name="title"
                  type="text"
                  placeholder="e.g. Revise OS Chapter 4"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </div>

              {/* Type */}
              <div className="form-group">
                <label htmlFor="event-type">
                  Event Type
                </label>

                <select
                  id="event-type"
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                >
                  <option value="study">
                    Study Session
                  </option>

                  <option value="task">
                    Task / Deadline
                  </option>

                  <option value="exam">
                    Exam
                  </option>
                </select>
              </div>

              {/* Date and Time */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="event-date">
                    Date
                  </label>

                  <input
                    id="event-date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="event-time">
                    Time
                  </label>

                  <input
                    id="event-time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="event-subject">
                  Subject
                </label>

                <input
                  id="event-subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Data Structures"
                  value={formData.subject}
                  onChange={handleFormChange}
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
                  <Plus size={18} />
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;