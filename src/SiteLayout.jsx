import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Arrow({ direction }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={direction === "down" ? "arrow-down" : ""}
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="header">
        <Link
          to="/"
          className="logo"
          aria-label="Tenchi Chen home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">
            tc<span>.</span>
          </span>
          <span className="brand-name">
            Tenchi Chen<span>DATA & BUSINESS ANALYTICS</span>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="site-navigation"
          className={open ? "is-open" : ""}
          aria-label="Main navigation"
          onClick={() => setOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              document.querySelector(".menu-toggle")?.focus();
            }
          }}
        >
          <Link to="/#projects">Work</Link>
          <Link
            to="/experience"
            aria-current={pathname === "/experience" ? "page" : undefined}
          >
            Experience
          </Link>
          <Link to="/#about">About</Link>
          <Link className="nav-contact" to="/#contact">
            Let’s talk <Arrow />
          </Link>
        </nav>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} Tenchi Chen</span>
      <span>Built with curiosity. Based in NYC.</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}

export function CaseFooter({ next, title }) {
  return (
    <>
      <aside className="case-next">
        <span className="eyebrow">KEEP EXPLORING</span>
        <Link to={next}>
          {title}
          <Arrow />
        </Link>
        <Link className="text-link" to="/#projects">
          All selected work <Arrow />
        </Link>
      </aside>
      <Footer />
    </>
  );
}
