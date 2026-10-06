import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  Check,
  Focus,
  Layers3,
  MessageCircle,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    number: "01",
    title: "A plan that thinks ahead",
    text: "Turn your subjects, deadlines, and available hours into a study plan that feels possible.",
  },
  {
    icon: Focus,
    number: "02",
    title: "Focus, without the fuss",
    text: "Break big assignments into clear next steps, then settle into a focused session.",
  },
  {
    icon: Layers3,
    number: "03",
    title: "See the whole semester",
    text: "Keep exams, classes, and small wins in one calm place, so nothing sneaks up on you.",
  },
  {
    icon: MessageCircle,
    number: "04",
    title: "A study partner, on call",
    text: "Ask for a clearer explanation, quick revision notes, or a nudge to get started.",
    link: "/ai-assistant",
  },
];

function CognivaMark({ size = 20 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 11.5c4.1-.8 7.5.2 10.5 3v12c-3-2.8-6.4-3.8-10.5-3v-12Z" />
      <path d="M26.5 11.5c-4.1-.8-7.5.2-10.5 3v12c3-2.8 6.4-3.8 10.5-3v-12Z" />
      <path d="M12.4 8.3 16 5l3.6 3.3" />
      <path d="M16 5v5.2" />
      <circle cx="16" cy="4" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="cogniva-home">
      <nav className="home-nav" aria-label="Main navigation">
        <Link to="/" className="home-brand" aria-label="Cogniva home">
          <span className="home-brand-mark"><CognivaMark size={21} /></span>
          <span>COGNIVA<span className="brand-period">.</span></span>
        </Link>
        <div className="home-nav-links">
          <a href="#approach">The approach</a>
          <a href="#features">What you can do</a>
        </div>
        <div className="home-nav-actions">
          <Link to="/login" className="home-login">Log in</Link>
          <Link to="/signup" className="home-nav-cta">Get started <ArrowUpRight size={15} /></Link>
        </div>
      </nav>

      <section className="home-hero">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="kicker-line" /> YOUR SPACE TO THINK CLEARLY</div>
          <h1>Make room<br />for <em>what matters.</em></h1>
          <p className="hero-lede">A quieter way to plan your studies. Bring your deadlines, focus time, and next big idea together — then take it one thoughtful step at a time.</p>
          <div className="hero-cta-row">
            <Link to="/signup" className="home-primary">Build your study space <ArrowRight size={17} /></Link>
            <a href="#approach" className="home-text-link">See how it works <ArrowDownRight size={16} /></a>
          </div>
          <div className="hero-note"><span className="note-avatars"><i>A</i><i>✦</i><i>+</i></span><span>Made for your kind of focus.</span></div>
        </div>

        <div className="hero-art" aria-label="Preview of the Cogniva study dashboard">
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <div className="art-caption"><span>01 / YOUR WEEK, IN VIEW</span><span>MON — FRI</span></div>
          <div className="study-window">
            <div className="window-topline"><span className="window-logo"><CognivaMark size={19} /> COGNIVA</span><span className="window-date">THURSDAY, OCT 8</span><span className="window-avatar">A</span></div>
            <div className="window-welcome"><div><span className="window-eyebrow">YOUR STUDY DESK</span><h2>A little progress<br /><em>goes a long way.</em></h2></div><span className="sun-mark">✳</span></div>
            <div className="window-grid">
              <div className="window-card week-card"><div className="window-card-title">This week <span>↗</span></div><div className="week-total">8.5 <small>hrs focused</small></div><div className="week-bars"><i style={{height:"38%"}}/><i style={{height:"62%"}}/><i style={{height:"46%"}}/><i className="bar-today" style={{height:"84%"}}/><i style={{height:"55%"}}/><i style={{height:"32%"}}/><i style={{height:"18%"}}/></div><div className="week-days"><span>M</span><span>T</span><span>W</span><b>T</b><span>F</span><span>S</span><span>S</span></div></div>
              <div className="window-card next-card"><div className="window-card-title">Up next <span className="next-dot" /></div><div className="next-time">10:30 <small>AM</small></div><div className="next-subject">Discrete mathematics</div><div className="next-rule"/><div className="next-meta"><BookOpen size={13}/> Revision · 45 min</div></div>
            </div>
            <div className="window-task"><span className="task-check"><Check size={12}/></span><span><b>Review lecture notes</b><small>Data structures · due today</small></span><span className="task-arrow">↗</span></div>
            <div className="window-ai"><span className="ai-spark"><Sparkles size={15}/></span><span><b>A gentle nudge</b><small>Your discrete maths exam is 6 days away. You’re right on track.</small></span></div>
          </div>
          <div className="art-footnote"><span>LESS SCRAMBLING, MORE LEARNING</span><span>✳</span></div>
        </div>
        <div className="hero-side-index">COGNIVA&nbsp; / &nbsp;STUDENT LIFE, IN BALANCE</div>
      </section>

      <section className="home-manifesto" id="approach">
        <div className="manifesto-label"><span>THE IDEA</span><span>02 — 04</span></div>
        <div className="manifesto-copy"><p>School asks you to hold a lot at once.</p><h2>Your planner should help you <em>let go</em> of the mental tabs — so you can give your attention to the one in front of you.</h2></div>
        <div className="manifesto-aside"><span className="aside-star">✳</span><p>Thoughtful tools for the work you care about.</p></div>
      </section>

      <section className="home-features" id="features">
        <div className="features-heading"><div><span className="section-eyebrow">A BETTER KIND OF STUDY ROUTINE</span><h2>Clear the noise.<br /><em>Keep your momentum.</em></h2></div><p>All the pieces of your study life, working together in a space that gives your attention back.</p></div>
        <div className="feature-list">{features.map(({icon: Icon, number, title, text, link}) => <article className="feature-row" key={number}><span className="feature-number">{number}</span><span className="feature-icon"><Icon size={19} strokeWidth={1.7}/></span><div className="feature-copy"><h3>{title}</h3><p>{text}</p>{link && <Link to={link} className="feature-chat-link">Meet your study assistant <ArrowRight size={13}/></Link>}</div><ArrowUpRight className="feature-arrow" size={19}/></article>)}</div>
      </section>

      <section className="home-closer">
        <div className="closer-orb"/><div className="closer-index">A FRESH PAGE, WHENEVER YOU NEED ONE</div>
        <span className="closer-spark"><Sparkles size={18}/></span><h2>Start where you are.<br /><em>Go from there.</em></h2>
        <p>Your next good study day can start with one small decision.</p>
        <Link to="/signup" className="closer-cta">Create your space <ArrowRight size={17}/></Link>
      </section>

      <footer className="home-footer"><Link to="/" className="home-brand"><span className="home-brand-mark"><CognivaMark size={21}/></span><span>COGNIVA<span className="brand-period">.</span></span></Link><span>Make a little room for learning.</span><span>© {new Date().getFullYear()} COGNIVA</span></footer>
    </main>
  );
}
