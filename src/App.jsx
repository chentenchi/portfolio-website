
import { useState } from 'react'
import './App.css'
import GroceryDashboard from './GroceryDashboard'

const projects = [
  {
    id: 'grocery',
    number: '01',
    category: 'Analytics',
    title: 'Grocery Price Tracker',
    description:
      'An automated data pipeline that collects grocery prices and tracks historical pricing, promotions, and basket costs.',
    technologies: ['Python', 'Tableau', 'PowerShell'],
    details:
      'Explore price trends, compare products, and understand how grocery costs change over time.',
    github: 'https://github.com/chentenchi/Grocery-Price-Tracker',
    status: 'Interactive dashboard coming soon',
  },
  {
    id: 'clash',
    number: '02',
    category: 'Machine Learning',
    title: 'Clash Royale ML Pipeline',
    description:
      'A PySpark machine learning pipeline built using historical Clash Royale battle data.',
    technologies: ['PySpark', 'Spark MLlib', 'Google Cloud'],
    details:
      'Explore the modeling process, feature engineering, and prediction results from the pipeline.',
    github: 'https://github.com/chentenchi/clash-royale-ml-pipeline',
    status: 'Interactive model demo coming soon',
  },
  {
    id: 'tax',
    number: '03',
    category: 'Applied AI',
    title: 'Tax Notice Assistant',
    description:
      'A custom AI assistant designed to identify tax notices and transform unstructured documents into standardized data.',
    technologies: ['AI', 'Document Extraction', 'Structured Data'],
    details:
      'See how fictional sample tax notices can be converted into a structured table.',
    github: 'https://github.com/chentenchi/tax-notice-assistant-gpt',
    status: 'Sample document demo coming soon',
  },
]

const filters = [
  'All',
  'Analytics',
  'Machine Learning',
  'Applied AI',
]

function App() {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const visibleProjects = projects.filter(
    (project) =>
      filter === 'All' || project.category === filter
  )

  return (
    <div id="top" className="site">
      <header className="header">
        <a href="#top" className="logo">TC<span>.</span></a>

        <nav aria-label="Main navigation">
          <a href="#projects">Projects</a>
          <a href="/experience">Experience</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
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
        <section className="hero">
          <div className="eyebrow">
            DATA ANALYST · MS BUSINESS ANALYTICS
          </div>

          <h1>
            Hi, I'm <span>Tenchi Chen.</span>
          </h1>

          <p className="hero-description">
            I build analytics tools, automated data pipelines,
            machine learning models, and practical AI applications.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#projects">
              Explore Projects ↓
            </a>

            <a
              className="secondary-button"
              href="https://github.com/chentenchi"
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub ↗
            </a>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-heading">
            <p className="eyebrow">MY WORK</p>
            <h2>Featured Projects</h2>
            <p>
              A collection of projects covering analytics,
              machine learning, and applied AI.
            </p>
          </div>

          <div className="filters" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? 'filter active' : 'filter'}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-top">
                  <span className="project-number">
                    {project.number}
                  </span>
                  <span className="project-category">
                    {project.category}
                  </span>
                </div>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tags">
                  {project.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                {expanded === project.id && (
                  <div className="project-details">
                    <p>{project.details}</p>
                    <span>{project.status}</span>
                  </div>
                )}

                <div className="project-actions">
                  <button
                    className="details-button"
                    onClick={() =>
                      setExpanded(
                        expanded === project.id ? null : project.id
                      )
                    }
                    aria-expanded={expanded === project.id}
                  >
                    {expanded === project.id
                      ? 'Show less −'
                      : 'Project details +'}
                  </button>
  {project.id === 'grocery' && (
    <a
      href="#grocery-dashboard"
      className="dashboard-link"
    >
      Explore Dashboard ↓
    </a>
  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source code ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
<div style={{ minHeight: '1200px' }}>
  <GroceryDashboard />
</div>
        <section id="about" className="section about">
          <p className="eyebrow">ABOUT ME</p>
          <h2>Analytics with a business perspective.</h2>

          <p>
            I'm a data analyst with a master's degree in Business
            Analytics and four years of prior professional experience
            in HR and People Operations.
          </p>

          <p>
            My work combines technical problem-solving with an
            understanding of business processes, reporting, and
            decision-making.
          </p>

          <div className="tags">
            {[
              'SQL', 'Python', 'Tableau', 'Excel',
              'PySpark', 'R', 'Git', 'Google Cloud',
            ].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>

<section id="contact" className="section contact">
  <p className="eyebrow">GET IN TOUCH</p>
  <h2>Let's connect.</h2>

  <p>
    I'm always open to connecting about opportunities
    in data analytics, data science, business analytics, and AI.
    Feel free to reach out!
  </p>

  <div className="contact-links">
    <a href="mailto:chentenchi@gmail.com">
      Email ↗
    </a>

    <a
      href="https://www.linkedin.com/in/tenchi/"
      target="_blank"
      rel="noopener noreferrer"
    >
      LinkedIn ↗
    </a>

    <a
      href="https://github.com/chentenchi"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub ↗
    </a>
  </div>
</section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Tenchi Chen</span>
        <a
          href="https://github.com/chentenchi"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
      </footer>
    </div>
  )
}

export default App