function StarIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 3.6 2.55 5.17 5.71.83-4.13 4.03.98 5.69L12 16.64l-5.11 2.68.98-5.69-4.13-4.03 5.71-.83z"/></svg>;
}

function CalendarIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M16 2.5v4M8 2.5v4M3 9.5h18"/></svg>;
}

function getYear(date) {
  const year = date ? String(date).slice(0, 4) : '';
  return /^\d{4}$/.test(year) ? year : 'N/A';
}

export default function ShowCard({ show, onDetails }) {
  const image = show.image?.medium || show.image?.original;
  const rating = show.rating?.average ?? 'N/A';

  return (
    <article className="show-card">
      <div className="poster-wrap">
        {image ? <img src={image} alt={`${show.name} poster`} loading="lazy" /> : <div className="poster-placeholder"><span>No Image</span></div>}
        <div className="rating-badge"><StarIcon /> {rating}</div>
      </div>
      <div className="card-content">
        <h3 title={show.name}>{show.name}</h3>
        <div className="meta-row">
          <span><CalendarIcon /> {getYear(show.premiered)}</span>
          <span>{show.type || 'Show'}</span>
        </div>
        <button type="button" className="details-btn" onClick={() => onDetails(show)}>See Details</button>
      </div>
    </article>
  );
}
