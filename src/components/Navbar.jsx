import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Icon({ children, size = 20, viewBox = '0 0 24 24' }) {
  return <svg width={size} height={size} viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark"><Icon size={20}><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z"/><path d="m9 4 1.5 16M15 4l1.5 16M4 9h16M4 15h16"/></Icon></span>
          <span>Movie<span>Explorer</span></span>
        </Link>

        <button className="mobile-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          <Icon>{menuOpen ? <><path d="m6 6 12 12"/><path d="M18 6 6 18"/></> : <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>}</Icon>
        </button>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/movies" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Movies</NavLink>
          <Link to="/movies" className="nav-cta" onClick={closeMenu}>Explore Movies</Link>
        </nav>
      </div>
    </header>
  );
}
