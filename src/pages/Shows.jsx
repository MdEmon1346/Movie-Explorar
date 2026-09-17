import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ShowCard from '../components/ShowCard';
import ShowModal from '../components/ShowModal';
import { getAllShows, searchShows } from '../services/tvmaze';

function SearchIcon() { return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>; }
function RefreshIcon({ spin }) { return <svg className={spin ? 'icon-spin' : ''} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M20 11a8 8 0 0 0-14.9-3.9L3 10"/><path d="M3 5v5h5"/><path d="M4 13a8 8 0 0 0 14.9 3.9L21 14"/><path d="M21 19v-5h-5"/></svg>; }
function EmptyIcon() { return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/><path d="M8.5 11h5"/></svg>; }

export default function Shows() {
  const [shows, setShows] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [sort, setSort] = useState('default');
  const requestId = useRef(0);

  const loadAllShows = useCallback(async (signal) => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllShows(signal);
      setShows(Array.isArray(data) ? data : []);
      setSearchResults(null);
    } catch (err) {
      if (err.name !== 'AbortError') setError('Unable to load shows. Please check your internet connection and try again.');
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadAllShows(controller.signal);
    return () => controller.abort();
  }, [loadAllShows]);

  useEffect(() => {
    const value = query.trim();
    if (!value) {
      setSearchResults(null);
      setSearching(false);
      setError('');
      return undefined;
    }

    const controller = new AbortController();
    const currentRequest = ++requestId.current;
    const timer = setTimeout(async () => {
      setSearching(true);
      setError('');
      try {
        const data = await searchShows(value, controller.signal);
        if (currentRequest === requestId.current) setSearchResults(data);
      } catch (err) {
        if (err.name !== 'AbortError' && currentRequest === requestId.current) setError('Search failed. Please try again.');
      } finally {
        if (!controller.signal.aborted && currentRequest === requestId.current) setSearching(false);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const displayedShows = useMemo(() => {
    const source = searchResults ?? shows;
    const copy = [...source];
    if (sort === 'rating') copy.sort((a, b) => (b.rating?.average ?? -1) - (a.rating?.average ?? -1));
    if (sort === 'name') copy.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'year') copy.sort((a, b) => String(b.premiered || '').localeCompare(String(a.premiered || '')));
    return copy;
  }, [searchResults, shows, sort]);

  const refresh = () => {
    const controller = new AbortController();
    loadAllShows(controller.signal);
  };

  const isInitialLoading = loading && shows.length === 0 && searchResults === null;

  return (
    <div className="shows-page">
      <section className="shows-heading">
        <div className="container">
          <div className="eyebrow"><span className="dot" /> MOVIE / SHOW CATALOG</div>
          <h1>Find your next <span>favorite.</span></h1>
          <p>Browse the available TVMaze catalog or search for a specific title. Select any card to view complete details.</p>
          <div className="search-box">
            <SearchIcon />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for a movie or show..." aria-label="Search for a movie or show" autoComplete="off" />
            {query && <button type="button" className="clear-search" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
            {searching && <span className="search-spinner" aria-label="Searching" />}
          </div>
        </div>
      </section>

      <section className="catalog container">
        <div className="catalog-top">
          <div>
            <p className="section-label">CATALOG</p>
            <h2>{query.trim() ? `Search results for “${query.trim()}”` : 'All Shows'}</h2>
            <p>{loading && !shows.length ? 'Loading titles...' : `${displayedShows.length.toLocaleString()} title${displayedShows.length === 1 ? '' : 's'} available`}</p>
          </div>
          <div className="catalog-actions">
            <label className="sort-control">Sort
              <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort shows">
                <option value="default">Default</option>
                <option value="rating">Rating</option>
                <option value="name">Name</option>
                <option value="year">Newest</option>
              </select>
            </label>
            <button type="button" className="refresh-btn" onClick={refresh} disabled={loading} title="Refresh shows"><RefreshIcon spin={loading} /> <span>Refresh</span></button>
          </div>
        </div>

        {error && <div className="error-box"><strong>Something went wrong</strong><span>{error}</span><button type="button" onClick={refresh}>Try Again</button></div>}

        {isInitialLoading ? (
          <div className="skeleton-grid" aria-label="Loading shows">{Array.from({ length: 8 }, (_, index) => <div className="skeleton-card" key={index}><div className="skeleton-poster"/><div className="skeleton-line"/><div className="skeleton-line short"/></div>)}</div>
        ) : !error && displayedShows.length > 0 ? (
          <div className="show-grid">{displayedShows.map((show) => <ShowCard key={show.id} show={show} onDetails={setSelectedShow} />)}</div>
        ) : !error ? (
          <div className="empty-state"><EmptyIcon /><h3>No shows found</h3><p>Try a different title or clear the search box.</p><button type="button" onClick={() => setQuery('')}>Show All Titles</button></div>
        ) : null}
      </section>

      <ShowModal show={selectedShow} onClose={() => setSelectedShow(null)} />
    </div>
  );
}
