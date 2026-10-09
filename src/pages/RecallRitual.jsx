import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const readList = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const DAY = 24 * 60 * 60 * 1000;

function makeQueue(decks, subjects, exams) {
  const subjectMap = new Map(subjects.map((subject) => [subject.name, subject]));
  const upcoming = exams
    .map((exam) => ({ ...exam, daysAway: Math.ceil((new Date(`${exam.date}T${exam.time || "00:00"}`).getTime() - Date.now()) / DAY) }))
    .filter((exam) => Number.isFinite(exam.daysAway) && exam.daysAway >= 0);
  return decks.flatMap((deck) => (deck.cards || []).map((card) => {
    const subject = subjectMap.get(deck.subject);
    const exam = upcoming.find((item) => item.subject === deck.subject);
    const dueAt = Number(card.dueAt || 0);
    const due = !dueAt || dueAt <= Date.now();
    const weakSubjectBonus = Math.max(0, 100 - Number(subject?.progress ?? 65));
    const examBonus = exam ? Math.max(0, 30 - exam.daysAway) * 2 : 0;
    return { ...card, deckId: deck.id, deckTitle: deck.title, subjectName: deck.subject, due, dueAt, priority: weakSubjectBonus + examBonus };
  }))
    .sort((a, b) => Number(b.due) - Number(a.due) || b.priority - a.priority || a.dueAt - b.dueAt)
    .slice(0, 5);
}

function RecallRitual() {
  const [decks, setDecks] = useState(() => readList("cogniva_flashcard_decks"));
  const subjects = useMemo(() => readList("cogniva_subjects"), []);
  const exams = useMemo(() => readList("cogniva_exams"), []);
  const [position, setPosition] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState({ remembered: 0, revisit: 0 });

  const [queue, setQueue] = useState(() => makeQueue(
    readList("cogniva_flashcard_decks"),
    readList("cogniva_subjects"),
    readList("cogniva_exams")
  ));
  const upcoming = useMemo(() => exams
    .map((exam) => ({ ...exam, daysAway: Math.ceil((new Date(`${exam.date}T${exam.time || "00:00"}`).getTime() - Date.now()) / DAY) }))
    .filter((exam) => Number.isFinite(exam.daysAway) && exam.daysAway >= 0)
    .sort((a, b) => a.daysAway - b.daysAway), [exams]);

  const card = queue[position];
  const dueCount = decks.reduce((sum, deck) => sum + (deck.cards || []).filter((item) => !item.dueAt || Number(item.dueAt) <= Date.now()).length, 0);
  const nextExam = [...upcoming].sort((a, b) => a.daysAway - b.daysAway)[0];

  const rate = (remembered) => {
    if (!card) return;
    const now = Date.now();
    const reviews = Number(card.reviewCount || 0);
    const interval = Number(card.intervalDays || 0);
    const intervalDays = remembered ? (reviews === 0 ? 1 : reviews === 1 ? 3 : Math.max(3, interval * 2)) : 0;
    const dueAt = remembered ? now + intervalDays * DAY : now + 10 * 60 * 1000;

    const updated = decks.map((deck) => deck.id === card.deckId
      ? { ...deck, cards: deck.cards.map((item) => item.id === card.id
        ? { ...item, reviewCount: reviews + 1, intervalDays, lastReviewedAt: now, dueAt }
        : item) }
      : deck);
    setDecks(updated);
    localStorage.setItem("cogniva_flashcard_decks", JSON.stringify(updated));
    setResults((current) => ({
      remembered: current.remembered + (remembered ? 1 : 0),
      revisit: current.revisit + (remembered ? 0 : 1),
    }));
    setRevealed(false);
    if (position + 1 >= queue.length) setFinished(true);
    else setPosition((current) => current + 1);
  };

  const resetSession = () => {
    setPosition(0);
    setRevealed(false);
    setFinished(false);
    setResults({ remembered: 0, revisit: 0 });
    const savedDecks = readList("cogniva_flashcard_decks");
    const savedSubjects = readList("cogniva_subjects");
    const savedExams = readList("cogniva_exams");
    setDecks(savedDecks);
    setQueue(makeQueue(savedDecks, savedSubjects, savedExams));
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="page-container recall-page">
          <header className="page-header recall-header">
            <div>
              <Link to="/dashboard" className="breadcrumb"><ArrowLeft size={15} /> Dashboard</Link>
              <span className="eyebrow"><Sparkles size={13} /> A SMALL DAILY PRACTICE</span>
              <h1 className="page-title">Your <em>Recall Ritual</em></h1>
              <p className="page-subtitle">A few thoughtful cards, chosen around what needs your attention today.</p>
            </div>
            <Link to="/flashcards" className="secondary-btn"><BookOpen size={16} /> Your flashcards</Link>
          </header>

          <section className="recall-intro glass">
            <div className="recall-intro-copy">
              <span className="eyebrow">TODAY, AT YOUR PACE</span>
              <h2>Remember a little more.<br /><em>Without the overwhelm.</em></h2>
              <p>We bring due cards forward and gently prioritize subjects with lower progress or an approaching exam.</p>
              <div className="recall-signals">
                <span><RotateCcw size={14} /> {dueCount} due {dueCount === 1 ? "card" : "cards"}</span>
                {nextExam && <span><Target size={14} /> {nextExam.name} · {nextExam.daysAway === 0 ? "today" : `${nextExam.daysAway} days`}</span>}
              </div>
            </div>
            <div className="recall-orbit" aria-hidden="true"><span>✳</span><i /><b /></div>
            <div className="recall-today-mark"><Sparkles size={15} /><span>THE DAILY<br />FIVE</span></div>
          </section>

          {!queue.length ? (
            <section className="recall-empty glass">
              <span className="recall-empty-icon"><BookOpen size={24} /></span>
              <span className="eyebrow">YOUR FIRST SESSION</span>
              <h2>Give your memory something to hold.</h2>
              <p>Create a deck and add a few cards. Cogniva will bring them back for review and help you build a gentle rhythm.</p>
              <Link to="/flashcards" className="primary-btn">Create flashcards <ArrowRight size={15} /></Link>
            </section>
          ) : finished ? (
            <section className="recall-finish glass">
              <span className="recall-finish-icon"><Check size={25} /></span>
              <span className="eyebrow">RITUAL COMPLETE</span>
              <h2>You showed up for your memory.</h2>
              <p>{results.remembered} remembered · {results.revisit} marked to revisit. Your next review times are saved automatically.</p>
              <div className="recall-finish-actions">
                <button type="button" className="primary-btn" onClick={resetSession}>Another round <RotateCcw size={15} /></button>
                <Link to="/dashboard" className="secondary-btn">Back to dashboard <ChevronRight size={15} /></Link>
              </div>
            </section>
          ) : (
            <section className="recall-session glass">
              <div className="recall-session-heading">
                <div><span className="eyebrow">A MOMENT TO REMEMBER</span><h2>{card.deckTitle}</h2><p>{card.subjectName}</p></div>
                <span className="recall-counter">{position + 1}<i>/</i>{queue.length}</span>
              </div>
              <div className="recall-progress"><span style={{ width: `${((position + 1) / queue.length) * 100}%` }} /></div>
              <div className={`recall-card ${revealed ? "is-revealed" : ""}`}>
                <span className="recall-card-label">{revealed ? "THE IDEA" : "RECALL FROM MEMORY"}</span>
                <p>{revealed ? card.back : card.front}</p>
                {!revealed && <button type="button" className="recall-reveal" onClick={() => setRevealed(true)}>Reveal answer <ArrowRight size={15} /></button>}
              </div>
              {revealed ? (
                <div className="recall-ratings">
                  <span>How did that feel?</span>
                  <div><button type="button" className="recall-again" onClick={() => rate(false)}><RotateCcw size={15} /> I need another look</button><button type="button" className="recall-got-it" onClick={() => rate(true)}><Check size={15} /> I remembered</button></div>
                </div>
              ) : <p className="recall-prompt"><Clock3 size={14} /> Try to say the answer before revealing it.</p>}
            </section>
          )}

          <footer className="recall-footnote"><Sparkles size={13} /> Your “remembered” and “revisit” choices shape when each card returns.</footer>
        </div>
      </main>
    </div>
  );
}

export default RecallRitual;
