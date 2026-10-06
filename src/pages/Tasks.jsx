import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Edit3,
  Clock3,
  Flag,
  Search,
  X,
  CalendarDays,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const initialTasks = [
  {
    id: 1,
    title: "Complete Java assignment",
    subject: "Java",
    priority: "High",
    dueDate: "Today",
    completed: false,
    duration: "2 hrs",
  },
  {
    id: 2,
    title: "Revise Graph Theory",
    subject: "Discrete Mathematics",
    priority: "Medium",
    dueDate: "Today",
    completed: true,
    duration: "1.5 hrs",
  },
  {
    id: 3,
    title: "Practice Operating Systems questions",
    subject: "Operating Systems",
    priority: "High",
    dueDate: "Tomorrow",
    completed: false,
    duration: "2 hrs",
  },
  {
    id: 4,
    title: "Read COA microoperations",
    subject: "COA",
    priority: "Low",
    dueDate: "Oct 4",
    completed: false,
    duration: "1 hr",
  },
];

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [newTask, setNewTask] = useState({
    title: "",
    subject: "",
    priority: "Medium",
    dueDate: "",
    duration: "",
  });

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addTask = (e) => {
    e.preventDefault();

    if (!newTask.title || !newTask.subject) return;

    const task = {
      id: Date.now(),
      title: newTask.title,
      subject: newTask.subject,
      priority: newTask.priority,
      dueDate: newTask.dueDate || "No date",
      duration: newTask.duration || "1 hr",
      completed: false,
    };

    setTasks((prev) => [task, ...prev]);

    setNewTask({
      title: "",
      subject: "",
      priority: "Medium",
      dueDate: "",
      duration: "",
    });

    setShowModal(false);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.subject.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && task.completed) ||
      (filter === "Pending" && !task.completed) ||
      task.priority === filter;

    return matchesSearch && matchesFilter;
  });

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  const priorityClass = (priority) => {
    if (priority === "High") return "priority-high";
    if (priority === "Medium") return "priority-medium";
    return "priority-low";
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="page-container tasks-page">

        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <p className="eyebrow">PRODUCTIVITY</p>
            <h1>My Tasks</h1>
            <p className="muted">
              Organize your study work and stay on track.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>

        {/* STATS */}
        <div className="stats-grid">

          <div className="stat-card glass">
            <div className="stat-icon blue">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p>Total Tasks</p>
              <h2>{tasks.length}</h2>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon green">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p>Completed</p>
              <h2>{completedCount}</h2>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon purple">
              <Clock3 size={22} />
            </div>
            <div>
              <p>Pending</p>
              <h2>{pendingCount}</h2>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon orange">
              <Flag size={22} />
            </div>
            <div>
              <p>High Priority</p>
              <h2>
                {tasks.filter((task) => task.priority === "High").length}
              </h2>
            </div>
          </div>

        </div>

        {/* CONTROLS */}
        <div
          className="glass"
          style={{
            padding: "18px",
            marginBottom: "24px",
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >

          {/* SEARCH */}
          <div
            style={{
              position: "relative",
              flex: 1,
              minWidth: "220px",
            }}
          >
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.5,
              }}
            />

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                paddingLeft: "42px",
              }}
            />
          </div>

          {/* FILTER */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              width: "180px",
              cursor: "pointer",
            }}
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

        </div>

        {/* TASK LIST */}
        <div className="glass" style={{ padding: "24px" }}>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>All Tasks</h2>
              <p className="muted" style={{ marginTop: "5px" }}>
                {filteredTasks.length} tasks found
              </p>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
                opacity: 0.7,
              }}
            >
              <CheckCircle2
                size={45}
                style={{ marginBottom: "15px" }}
              />

              <h3>No tasks found</h3>

              <p className="muted">
                Try changing your search or add a new task.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >

              {filteredTasks.map((task) => (

                <div
                  key={task.id}
                  className="task-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "17px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >

                  {/* COMPLETE BUTTON */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: task.completed
                        ? "#22c55e"
                        : "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    {task.completed ? (
                      <CheckCircle2 size={25} />
                    ) : (
                      <Circle size={25} />
                    )}
                  </button>

                  {/* TASK INFO */}
                  <div style={{ flex: 1 }}>

                    <h3
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        opacity: task.completed ? 0.55 : 1,
                      }}
                    >
                      {task.title}
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        flexWrap: "wrap",
                        marginTop: "7px",
                        fontSize: "12px",
                      }}
                    >

                      <span className="muted">
                        📚 {task.subject}
                      </span>

                      <span className="muted">
                        <Clock3
                          size={12}
                          style={{
                            verticalAlign: "middle",
                            marginRight: "4px",
                          }}
                        />
                        {task.duration}
                      </span>

                      <span className="muted">
                        <CalendarDays
                          size={12}
                          style={{
                            verticalAlign: "middle",
                            marginRight: "4px",
                          }}
                        />
                        {task.dueDate}
                      </span>

                    </div>

                  </div>

                  {/* PRIORITY */}
                  <span
                    className={`task-priority ${priorityClass(
                      task.priority
                    )}`}
                    style={{
                      padding: "5px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    {task.priority}
                  </span>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteTask(task.id)}
                    title="Delete task"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                      padding: "8px",
                    }}
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              ))}

            </div>
          )}

        </div>

      {/* ADD TASK MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >

          <div
            className="glass"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "30px",
              position: "relative",
            }}
          >

            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                right: "18px",
                top: "18px",
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>

            <h2 style={{ marginBottom: "6px" }}>
              Add New Task
            </h2>

            <p className="muted" style={{ marginBottom: "25px" }}>
              Create a task for your study plan.
            </p>

            <form onSubmit={addTask}>

              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  placeholder="e.g. Revise Java exceptions"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Java"
                  value={newTask.subject}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      subject: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                }}
              >

                <div className="form-group">
                  <label>Priority</label>

                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Duration</label>

                  <input
                    type="text"
                    placeholder="e.g. 2 hrs"
                    value={newTask.duration}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>

              </div>

              <div className="form-group">
                <label>Due Date</label>

                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      dueDate: e.target.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                className="primary-btn"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Plus size={18} />
                Add Task
              </button>

            </form>

          </div>
        </div>
      )}
        </div>
      </main>
    </div>
  );
}

export default Tasks;
