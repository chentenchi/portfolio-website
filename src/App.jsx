
import { useState } from 'react'
import './App.css'

const projects = [
  {
    id: 'grocery',
    number: '01',
    category: 'Analytics',
    title: 'Grocery Price Tracker',
    description:
      'Built an automated pricing pipeline and Tableau dashboard to track basket costs and compare Kroger prices against U.S. BLS benchmarks.',
    technologies: ['Python', 'Tableau', 'PowerShell'],
    details:
      'Explore price trends, compare products, and understand how grocery costs change over time.',
    github: 'https://github.com/chentenchi/Grocery-Price-Tracker',
    status: 'Interactive dashboard coming soon',
  },

  {
  id: 'forest',
  number: '04',
  category: 'Analytics',
  title: "Mapping NYC's Urban Forest",
  description:
    'Used R and geospatial analysis to investigate NYC street-tree conditions, identifying approximately 28% of recorded trees as dead in Queens District 32.',
  technologies: ['R', 'sf', 'ggplot2', 'Leaflet', 'Quarto'],
  details:
    'Combined public datasets using spatial joins, identified Queens District 32 as an area of concern, and developed an interactive map and tree-maintenance proposal.',
  github: 'https://github.com/chentenchi/STA9750-2025-FALL',
  status: 'Interactive map and geospatial case study',
},
  {
    id: 'clash',
    number: '02',
    category: 'Machine Learning',
    title: 'Clash Royale ML Pipeline',
    description:
      'Engineered battle features in PySpark and trained a logistic regression model to predict match outcomes, achieving a 0.6823 ROC AUC.',
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
      'Developed a Custom GPT to identify tax notices and extract key information into structured tables, with an interactive browser-based demonstration.',
    technologies: ['AI', 'Document Extraction', 'Structured Data'],
    details:
      'See how fictional sample tax notices can be converted into a structured table.',
    github: 'https://github.com/chentenchi/tax-notice-assistant-gpt',
    status: 'Sample document demo coming soon',
  },
]

const projectPreviews = {
  grocery: {
    src: '/images/grocery-preview.png',
    alt: 'Tableau dashboard comparing Kroger grocery prices with BLS benchmarks',
  },
  forest: {
    src: '/images/forest-district-comparison.png',
    alt: 'R visualization comparing tree counts and dead-tree percentages across selected NYC districts',
  },
  clash: {
    src: '/images/clash-roc.png',
    alt: 'ROC curve from the Clash Royale machine learning model',
  },
  tax: {
    src: '/images/tax-assistant-preview.png',
    alt: 'Fictional tax notice with extracted information shown in an analysis results table',
  },
}

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
  <div className="hero-inner">
    <div className="hero-copy">
      <p className="eyebrow">
        TENCHI CHEN / ANALYTICS & AUTOMATION
      </p>

      
<h1>
  Making data
  <br />
  <span>easier to act on.</span>
</h1>

      <p className="hero-description">
        I investigate data, uncover patterns, and build practical
        tools to solve business problems. My work combines
        analytical methods with experience in public-sector
        analytics and business operations.
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
    </div>

    <a
      href="/urban-forest"
      className="hero-visual"
      aria-label="Explore the NYC Urban Forest case study"
    >
      <img
        src="/images/forest-nyc-trees.png"
        alt="NYC street tree locations mapped over City Council district boundaries"
      />

      <div className="hero-visual-caption">
        <span>FEATURED ANALYSIS / R + SF</span>
        <strong>Mapping NYC's Urban Forest</strong>
        <span>Explore the case study ↗</span>
      </div>
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
  <h3>{project.title}</h3>
  <span className="project-category">
    {project.category}
  </span>
</div>  

<div className={`project-preview project-preview-${project.id}`}>
  <img
    src={projectPreviews[project.id].src}
    alt={projectPreviews[project.id].alt}
    loading="lazy"
  />
</div>

{project.id === 'tax' && (
  <div className="project-sample-result">
    <span>Fictional sample · Total due</span>
    <strong>$575.00</strong>
  </div>
)}

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
  href="/grocery-price-tracker"
  className="dashboard-link"
>
  Explore Dashboard ↗
</a>
  )}

{project.title?.toLowerCase().includes('tax notice') && (
  <a
    href="/tax-assistant"
    className="dashboard-link"
  >
    Explore Assistant ↗
  </a>
)}

  {project.title === 'Clash Royale ML Pipeline' && (
    <a
      href="/clash-royale"
     className="dashboard-link"
    >
     Explore ML Project ↗
    </a>
  )}

{project.id === 'forest' && (
  <a
    href="/urban-forest"
    className="dashboard-link"
  >
    Explore Case Study ↗
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

        
<section id="about" className="section about">
  <p className="eyebrow">ABOUT ME</p>
  <h2>Analytics with a business perspective.</h2>

  <div className="about-layout">
    <figure className="about-portrait">
      <img
        src="/images/about-photo.jpg"
        alt="Portrait of Tenchi Chen"
        loading="lazy"
      />
      <figcaption>Based in New York City</figcaption>
    </figure>

    <div className="about-copy">
      <p>
        I'm a Business Analytics graduate with four years of
        professional experience in HR and People Operations
        before transitioning into analytics.
      </p>

      <p>
        My recent work includes investigating data migration
        discrepancies at NYC Aging, building sales and inventory
        dashboards, and developing AI-assisted research tools.
        I enjoy combining technical analysis with an understanding
        of how businesses actually operate.
      </p>

      <div className="tags">
        {[
          'SQL',
          'Python',
          'Tableau',
          'Excel',
          'PySpark',
          'R',
          'Git',
          'Google Cloud',
        ].map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </div>
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