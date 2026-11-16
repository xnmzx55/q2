import { ArrowDown, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="container hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" />Your English, one word at a time</div>
        <h1>English Vocabulary<span>Grade 9</span></h1>
        <p className="hero-subtitle">Learn • Remember • Improve</p>
        <p className="hero-desc">A bright little place to explore your English words, meet their Arabic meanings and grow your confidence — one unit at a time.</p>
        <div className="hero-actions">
          <a href="#units" onClick={(e) => { e.preventDefault(); document.getElementById("units")?.scrollIntoView({ behavior: "smooth" }); }} className="button-primary" data-testid="button-explore-units">Explore the units <ArrowDown size={17} /></a>
          <span className="hero-note">Made for Grade 9 learners in Oman</span>
        </div>
      </div>
      <div className="hero-art" aria-label="Books, headphones and Big Ben illustration" role="img">
        <div className="art-orbit" />
        <div className="art-glow" />
        <img className="art-image art-ben" src={`${import.meta.env.BASE_URL}images/big-ben.png`} alt="" />
        <img className="art-image art-books" src={`${import.meta.env.BASE_URL}images/books.png`} alt="" />
        <img className="art-image art-headphones" src={`${import.meta.env.BASE_URL}images/headphones.png`} alt="" />
        <img className="art-image art-tiles" src={`${import.meta.env.BASE_URL}images/letter-tiles.png`} alt="" />
        <div className="tile-letters" aria-hidden="true"><span>A</span><span>B</span><span>C</span></div>
        <span className="sparkle sparkle-one"><Sparkles size={16} /></span>
        <span className="sparkle sparkle-two"><Sparkles size={14} /></span>
        <span className="sparkle sparkle-three"><Sparkles size={12} /></span>
        <span className="art-caption">Small steps. Big words.</span>
      </div>
    </section>
  );
}
