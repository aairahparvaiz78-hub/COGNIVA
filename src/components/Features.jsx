import { motion } from "framer-motion";
import {
  Brain,
  CalendarDays,
  BarChart3,
  CheckSquare,
  Clock3,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Study Planner",
    description:
      "Generate personalized study schedules based on your subjects, exams, available time, and progress.",
    color: "blue",
  },
  {
    icon: CheckSquare,
    title: "Smart Tasks",
    description:
      "Create, organize, prioritize, complete, and track every study task from one simple workspace.",
    color: "purple",
  },
  {
    icon: CalendarDays,
    title: "Study Calendar",
    description:
      "Keep exams, deadlines, tasks, and study sessions organized with an easy visual calendar.",
    color: "green",
  },
  {
    icon: Clock3,
    title: "Pomodoro Focus",
    description:
      "Use focused study sessions and breaks to maintain concentration and build consistent study habits.",
    color: "orange",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Understand your study habits with study-hour charts, subject progress, task completion, and streaks.",
    color: "pink",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    description:
      "Ask questions, get explanations, generate summaries, create practice questions, and improve your learning.",
    color: "cyan",
  },
];

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="section-container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-badge">
            <Sparkles size={14} />
            Everything You Need
          </div>

          <h2>
            Your complete <span className="gradient-text">study workspace.</span>
          </h2>

          <p>
            Plan your studies, manage your workload, stay focused, and use AI
            to learn more effectively.
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                className="feature-card glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -7 }}
              >
                <div className={`feature-icon ${feature.color}`}>
                  <Icon size={24} />
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <div className="feature-arrow">
                  Explore <span>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}