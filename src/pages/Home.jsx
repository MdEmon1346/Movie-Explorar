import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
        <div className="hero-grid-bg" />
        <div className="container hero-content">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="dot" /> DISCOVER YOUR NEXT STORY</div>
            <h1>Explore shows.<br /><span>Find favorites.</span></h1>
            <p>Search TV shows by title, browse the catalog, and open detailed information without leaving the page.</p>
            <div className="hero-actions">
              <Link to="/movies" className="primary-btn">Explore Movies <span>→</span></Link>
              <Link to="/movies" className="secondary-btn">Browse Catalog</Link>
            </div>
            <div className="hero-stats">
              <div><strong>FREE</strong><span>TVMaze data</span></div>
              <div><strong>SEARCH</strong><span>By title</span></div>
              <div><strong>DETAILS</strong><span>Interactive modal</span></div>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-card art-back"><span>DRAMA</span><b>01</b></div>
            <div className="art-card art-mid"><span>COMEDY</span><b>02</b></div>
            <div className="art-card art-front"><small>MOVIE</small><strong>EXPLORER</strong><i>DISCOVER<br />YOUR NEXT<br />FAVORITE</i></div>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <div className="container feature-grid">
          <div><span className="feature-number">01</span><div><h3>Search easily</h3><p>Find titles using the TVMaze search endpoint.</p></div></div>
          <div><span className="feature-number">02</span><div><h3>Browse responsively</h3><p>Explore a clean grid on mobile and desktop.</p></div></div>
          <div><span className="feature-number">03</span><div><h3>View details</h3><p>Open ratings, genres, dates, and summaries instantly.</p></div></div>
        </div>
      </section>
    </div>
  );
}
