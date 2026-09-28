
import GroceryDashboard from './GroceryDashboard.jsx'
import './App.css'

function GroceryTracker() {
  return (
    <div className="site">
      <header className="header">
        <a href="/" className="logo">
          TC<span>.</span>
        </a>

        <nav aria-label="Main navigation">
          <a href="/#projects">Projects</a>
          <a href="/experience">Experience</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>

          <a
            href="https://github.com/chentenchi"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </nav>
      </header>

      <main>
        <GroceryDashboard />
      </main>
    </div>
  )
}

export default GroceryTracker