import { useEffect } from 'react';

function cleanSummary(html = '') {
  const el = document.createElement('div');
  el.innerHTML = html;
  return (el.textContent || el.innerText || '').trim() || 'No summary available for this title.';
}

function CloseIcon() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 6 12 12"/><path d="M18 6 6 18"/></svg>;
}
function StarIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="m12 3.6 2.55 5.17 5.71.83-4.13 4.03.98 5.69L12 16.64l-5.11 2.68.98-5.69-4.13-4.03 5.71-.83z"/></svg>; }

export default function ShowModal({ show, onClose }) {
  useEffect(() => {
    if (!show) return undefined;
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [show, onClose]);

  if (!show) return null;

  const image = show.image?.original || show.image?.medium;
  const summary = cleanSummary(show.summary);
  const releaseDate = show.premiered || 'Not available';
  const genres = show.genres?.length ? show.genres : ['Uncategorized'];

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close details"><CloseIcon /></button>
        <div className="modal-hero">
          {image ? <img src={image} alt={`${show.name} backdrop`} /> : <div className="poster-placeholder"><span>No Image</span></div>}
          <div className="modal-overlay" />
          <div className="modal-heading">
            <span className="eyebrow">SHOW DETAILS</span>
            <h2 id="modal-title">{show.name}</h2>
            <div className="modal-pills">
              <span className="rating-pill"><StarIcon /> {show.rating?.average ?? 'N/A'}</span>
              <span>Release: {releaseDate}</span>
            </div>
          </div>
        </div>
        <div className="modal-body">
          <div className="genre-list">{genres.map((genre) => <span key={genre}>{genre}</span>)}</div>
          <p className="summary">{summary}</p>
          <div className="info-grid">
            <div><small>Language</small><strong>{show.language || 'N/A'}</strong></div>
            <div><small>Status</small><strong>{show.status || 'N/A'}</strong></div>
            <div><small>Runtime</small><strong>{show.runtime ? `${show.runtime} min` : 'N/A'}</strong></div>
            <div><small>Network</small><strong>{show.network?.name || show.webChannel?.name || 'N/A'}</strong></div>
          </div>
          <button type="button" className="close-bottom" onClick={onClose}>Close</button>
        </div>
      </section>
    </div>
  );
}
