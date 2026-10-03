import {
    Check,
    Circle,
    Clock3,
    CalendarDays,
    Pencil,
    Trash2,
    MoreVertical,
    AlertCircle,
  } from "lucide-react";
  
  export default function TaskCard({
    task,
    onToggle,
    onEdit,
    onDelete,
  }) {
    if (!task) return null;
  
    const priority = task.priority || "Medium";
  
    const priorityClass = priority.toLowerCase();
  
    const formatDate = (date) => {
      if (!date) return "No due date";
  
      const parsed = new Date(date);
  
      if (Number.isNaN(parsed.getTime())) {
        return date;
      }
  
      return parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };
  
    return (
      <div
        className={`task-card ${
          task.completed ? "task-card-completed" : ""
        }`}
      >
        <button
          className={`task-checkbox ${
            task.completed ? "checked" : ""
          }`}
          onClick={() => onToggle?.(task.id)}
          aria-label={
            task.completed ? "Mark task pending" : "Mark task complete"
          }
        >
          {task.completed ? (
            <Check size={15} strokeWidth={3} />
          ) : (
            <Circle size={18} />
          )}
        </button>
  
        <div className="task-card-content">
          <div className="task-card-title-row">
            <h3>{task.title}</h3>
  
            <span className={`priority-badge ${priorityClass}`}>
              {priority === "High" && <AlertCircle size={12} />}
              {priority}
            </span>
          </div>
  
          <div className="task-card-meta">
            {task.subject && (
              <span>
                <span className="task-subject-dot" />
                {task.subject}
              </span>
            )}
  
            {task.dueDate && (
              <span>
                <CalendarDays size={14} />
                {formatDate(task.dueDate)}
              </span>
            )}
  
            {task.duration && (
              <span>
                <Clock3 size={14} />
                {task.duration} min
              </span>
            )}
          </div>
  
          {task.description && (
            <p className="task-card-description">{task.description}</p>
          )}
        </div>
  
        <div className="task-card-actions">
          <button
            onClick={() => onEdit?.(task)}
            title="Edit task"
            className="icon-btn"
          >
            <Pencil size={16} />
          </button>
  
          <button
            onClick={() => onDelete?.(task.id)}
            title="Delete task"
            className="icon-btn danger"
          >
            <Trash2 size={16} />
          </button>
  
          <button className="icon-btn mobile-more" title="More">
            <MoreVertical size={17} />
          </button>
        </div>
      </div>
    );
  }