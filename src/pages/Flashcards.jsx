import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers3,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const STORAGE_KEY = "cogniva_flashcard_decks";

function readDecks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function Flashcards() {
  const [decks, setDecks] = useState(readDecks);
  const [activeDeckId, setActiveDeckId] = useState(() => readDecks()[0]?.id || null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [modal, setModal] = useState(null);
  const [deckForm, setDeckForm] = useState({ title: "", subject: "" });
  const [cardForm, setCardForm] = useState({ front: "", back: "" });
  const [session, setSession] = useState({ reviewed: 0, remembered: 0, practice: 0 });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  }, [decks]);

  const activeDeck = decks.find((deck) => deck.id === activeDeckId) || null;
  const activeCard = activeDeck?.cards?.[activeIndex] || null;
  const totalCards = useMemo(
    () => decks.reduce((total, deck) => total + deck.cards.length, 0),
    [decks]
  );

  const selectDeck = (id) => {
    setActiveDeckId(id);
    setActiveIndex(0);
    setIsFlipped(false);
    setSession({ reviewed: 0, remembered: 0, practice: 0 });
  };

  const createDeck = (event) => {
    event.preventDefault();
    const title = deckForm.title.trim();
    if (!title) return;
    const deck = {
      id: `deck-${Date.now()}`,
      title,
      subject: deckForm.subject.trim() || "Personal study",
      cards: [],
      createdAt: Date.now(),
    };
    setDecks((current) => [...current, deck]);
    setDeckForm({ title: "", subject: "" });
    setModal(null);
    selectDeck(deck.id);
  };

  const addCard = (event) => {
    event.preventDefault();
    const front = cardForm.front.trim();
    const back = cardForm.back.trim();
    if (!activeDeck || !front || !back) return;
    setDecks((current) => current.map((deck) => (
      deck.id === activeDeck.id
        ? { ...deck, cards: [...deck.cards, { id: `card-${Date.now()}`, front, back }] }
        : deck
    )));
    setCardForm({ front: "", back: "" });
    setActiveIndex(activeDeck.cards.length);
    setIsFlipped(false);
    setModal(null);
  };

  const removeDeck = (deck) => {
    if (!window.confirm(`Delete the “${deck.title}” deck and all its cards?`)) return;
    const remaining = decks.filter((item) => item.id !== deck.id);
    setDecks(remaining);
    if (activeDeckId === deck.id) {
      setActiveDeckId(remaining[0]?.id || null);
      setActiveIndex(0);
      setIsFlipped(false);
      setSession({ reviewed: 0, remembered: 0, practice: 0 });
    }
  };

  const moveCard = (direction) => {
    if (!activeDeck?.cards.length) return;
    setActiveIndex((index) => (index + direction + activeDeck.cards.length) % activeDeck.cards.length);
    setIsFlipped(false);
  };

  const rateCard = (remembered) => {
    setSession((current) => ({
      reviewed: current.reviewed + 1,
      remembered: current.remembered + (remembered ? 1 : 0),
      practice: current.practice + (remembered ? 0 : 1),
    }));
    moveCard(1);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="page-container flashcards-page">
          <header className="page-header flashcards-header">
            <div>
              <Link to="/dashboard" className="breadcrumb flashcards-back"><ArrowLeft size={15} /> Dashboard</Link>
              <span className="flashcards-kicker"><Sparkles size={13} /> A LITTLE PRACTICE, A LOT OF PROGRESS</span>
              <h1 className="page-title">The <em>memory</em> room</h1>
              <p className="page-subtitle">A softer way to make what you learn stay with you.</p>
            </div>
            <button className="primary-btn" type="button" onClick={() => setModal("deck")}>
              <Plus size={17} /> New deck
            </button>
          </header>

          <section className="flashcards-overview" aria-label="Flashcard library summary">
            <div className="flashcards-overview-copy">
              <div className="flashcards-mark"><Layers3 size={22} /></div>
              <div><span>Your library</span><strong>{decks.length} {decks.length === 1 ? "deck" : "decks"} · {totalCards} cards</strong></div>
            </div>
            <div className="flashcards-session-summary">
              <span>THIS SESSION</span><strong>{session.reviewed} <small>reviewed</small></strong>
              <span>{session.remembered} remembered · {session.practice} to revisit</span>
            </div>
          </section>

          {decks.length === 0 ? (
            <section className="flashcards-empty glass">
              <div className="flashcards-empty-orbit"><BookOpen size={28} /></div>
              <span className="eyebrow">START SMALL</span>
              <h2>Make your first deck</h2>
              <p>Gather the details you want to remember in one calm, focused place. Add a question on the front and its answer on the back.</p>
              <button className="primary-btn" type="button" onClick={() => setModal("deck")}><Plus size={17} /> Create a deck</button>
            </section>
          ) : (
            <div className="flashcards-workspace">
              <aside className="flashcards-decks glass">
                <div className="flashcards-decks-heading"><div><span className="eyebrow">YOUR COLLECTION</span><h2>Study decks</h2></div><button type="button" className="icon-btn" aria-label="Create deck" onClick={() => setModal("deck")}><Plus size={17} /></button></div>
                <div className="flashcards-deck-list">
                  {decks.map((deck) => (
                    <div className={`flashcards-deck ${deck.id === activeDeckId ? "active" : ""}`} key={deck.id}>
                      <button type="button" className="flashcards-deck-select" onClick={() => selectDeck(deck.id)}>
                        <span className="flashcards-deck-icon"><BookOpen size={16} /></span>
                        <span className="flashcards-deck-copy"><strong>{deck.title}</strong><small>{deck.subject}</small></span>
                        <span className="flashcards-deck-count">{deck.cards.length}</span>
                      </button>
                      <button type="button" className="flashcards-deck-delete" aria-label={`Delete ${deck.title}`} title="Delete deck" onClick={() => removeDeck(deck)}><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
                <button type="button" className="flashcards-create-link" onClick={() => setModal("deck")}><Plus size={14} /> Create another deck</button>
              </aside>

              <section className="flashcards-review glass">
                {activeDeck && (
                  <>
                    <div className="flashcards-review-top">
                      <div><span className="eyebrow">{activeDeck.subject}</span><h2>{activeDeck.title}</h2></div>
                      <button type="button" className="secondary-btn flashcards-add-button" onClick={() => setModal("card")}><Plus size={16} /> Add card</button>
                    </div>

                    {activeDeck.cards.length === 0 ? (
                      <div className="flashcards-no-cards">
                        <div className="flashcards-no-cards-icon"><Sparkles size={20} /></div>
                        <h3>This deck is ready for its first idea.</h3>
                        <p>Add a prompt, definition, formula, or question you want to remember.</p>
                        <button type="button" className="primary-btn" onClick={() => setModal("card")}><Plus size={16} /> Add the first card</button>
                      </div>
                    ) : (
                      <>
                        <div className="flashcards-progress-row"><span>Card {activeIndex + 1} of {activeDeck.cards.length}</span><div className="flashcards-progress"><span style={{ width: `${((activeIndex + 1) / activeDeck.cards.length) * 100}%` }} /></div><span>{Math.round(((activeIndex + 1) / activeDeck.cards.length) * 100)}%</span></div>
                        <button type="button" className={`flashcard ${isFlipped ? "is-flipped" : ""}`} onClick={() => setIsFlipped((value) => !value)} aria-label={isFlipped ? "Show question" : "Reveal answer"}>
                          <span className="flashcard-topline"><span>{isFlipped ? "THE REVERSE" : "TAKE A MOMENT"}</span><ArrowLeftRight size={15} /></span>
                          <span className="flashcard-face-label">{isFlipped ? "ANSWER" : "QUESTION"}</span>
                          <span className="flashcard-text">{isFlipped ? activeCard.back : activeCard.front}</span>
                          <span className="flashcard-hint"><RotateCcw size={13} /> Click to {isFlipped ? "see the question" : "reveal the answer"}</span>
                          <span className="flashcard-watermark">C.</span>
                        </button>
                        <div className="flashcards-controls">
                          <button type="button" className="secondary-btn" onClick={() => moveCard(-1)}><ChevronLeft size={16} /> Previous</button>
                          {!isFlipped ? (
                            <button type="button" className="primary-btn" onClick={() => setIsFlipped(true)}>Reveal answer <ArrowRight size={15} /></button>
                          ) : (
                            <div className="flashcards-rating"><button type="button" className="flashcards-again" onClick={() => rateCard(false)}><RotateCcw size={15} /> Still learning</button><button type="button" className="flashcards-remembered" onClick={() => rateCard(true)}><Check size={15} /> Got it</button></div>
                          )}
                          <button type="button" className="secondary-btn flashcards-next" onClick={() => moveCard(1)}>Next <ChevronRight size={16} /></button>
                        </div>
                        <p className="flashcards-note"><Sparkles size={13} /> Say the answer to yourself before you turn the card.</p>
                      </>
                    )}
                  </>
                )}
              </section>
            </div>
          )}
        </div>
      </main>

      {modal && (
        <div className="modal-overlay flashcards-modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null); }}>
          <form className="modal glass flashcards-form" onSubmit={modal === "deck" ? createDeck : addCard}>
            <div className="modal-header"><div><span className="eyebrow">{modal === "deck" ? "NEW COLLECTION" : "ADD TO YOUR DECK"}</span><h2>{modal === "deck" ? "Create a study deck" : "Create a flashcard"}</h2></div><button className="icon-btn" type="button" aria-label="Close" onClick={() => setModal(null)}><X size={17} /></button></div>
            {modal === "deck" ? (
              <>
                <label className="form-group"><span className="form-label">Deck name</span><input className="input-field" autoFocus maxLength={60} value={deckForm.title} onChange={(event) => setDeckForm({ ...deckForm, title: event.target.value })} placeholder="e.g. Cell biology essentials" required /></label>
                <label className="form-group"><span className="form-label">Subject <span className="flashcards-optional">Optional</span></span><input className="input-field" maxLength={48} value={deckForm.subject} onChange={(event) => setDeckForm({ ...deckForm, subject: event.target.value })} placeholder="e.g. Biology" /></label>
              </>
            ) : (
              <>
                <label className="form-group"><span className="form-label">Front · question or prompt</span><textarea className="input-field flashcards-textarea" autoFocus maxLength={500} value={cardForm.front} onChange={(event) => setCardForm({ ...cardForm, front: event.target.value })} placeholder="What do you want to remember?" required /></label>
                <label className="form-group"><span className="form-label">Back · answer or explanation</span><textarea className="input-field flashcards-textarea" maxLength={1200} value={cardForm.back} onChange={(event) => setCardForm({ ...cardForm, back: event.target.value })} placeholder="Write a clear answer in your own words…" required /></label>
              </>
            )}
            <div className="modal-actions"><button type="button" className="secondary-btn" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="primary-btn"><Plus size={16} /> {modal === "deck" ? "Create deck" : "Save card"}</button></div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Flashcards;
