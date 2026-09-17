function Icon({ children, size = 17 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-mark"><Icon size={18}><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z"/><path d="m9 4 1.5 16M15 4l1.5 16M4 9h16M4 15h16"/></Icon></span><span>Movie<span>Explorer</span></span></div>
          <p>Browse shows, search titles, and discover useful details in one clean interface.</p>
        </div>
        <div className="footer-links">
          <a href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer">TVMaze API</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 MovieExplorer. All rights reserved.</span>
        <span>Built with React</span>
      </div>
    </footer>
  );
}
