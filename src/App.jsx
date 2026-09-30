import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectVisual from "./ProjectVisual.jsx";
import { Arrow, Header, Footer } from "./SiteLayout.jsx";
import "./App.css";
import FeaturedCarousel from "./FeaturedCarousel.jsx";

const projects = [
  {
    id: "grocery",
    category: "Analytics",
    title: "The price of an everyday basket.",
    name: "Grocery Price Tracker",
    description:
      "An automated pricing pipeline that puts grocery costs in context. Explore product-level trends alongside national BLS benchmarks.",
    tools: "Python / Tableau / PowerShell",
    path: "/grocery-price-tracker",
    action: "Explore the dashboard",
  },
  {
    id: "forest",
    category: "Analytics",
    title: "A city of trees. Unevenly cared for.",
    name: "Mapping NYC’s Urban Forest",
    description:
      "Connecting street-tree records with council districts to investigate where maintenance could make a difference.",
    tools: "R / sf / ggplot2 / Leaflet",
    path: "/urban-forest",
    action: "Read the case study",
  },
  {
    id: "clash",
    category: "Machine Learning",
    title: "Finding patterns before the battle.",
    name: "Clash Royale ML Pipeline",
    description:
      "From historical battles to engineered features: a distributed pipeline for predicting match outcomes.",
    tools: "PySpark / Spark MLlib / Google Cloud",
    path: "/clash-royale",
    action: "Explore the pipeline",
  },
  {
    id: "tax",
    category: "Applied AI",
    title: "From a notice to something useful.",
    name: "Tax Notice Assistant",
    description:
      "Turning unstructured documents into organized information. Try the local extraction demo with fictional samples.",
    tools: "Custom GPT / Document extraction",
    path: "/tax-assistant",
    action: "Try the demo",
  },
];

export default function App() {
  const [filter, setFilter] = useState("All work");
  const visible = projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );
  return (
    <div id="top" className="site home">
      <Header />
      <main tabIndex={-1} id="main-content">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> TENCHI CHEN · DATA & BUSINESS
              ANALYTICS
            </p>
            <h1>
              Behind every number,
              <br />a better <em>decision.</em>
            </h1>
            <p className="hero-description">
              I turn messy data into clear, useful answers.
              <br className="desktop-break" /> Bringing a business perspective
              to analytics, automation, and the questions worth asking.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#projects">
                Explore my work <Arrow direction="down" />
              </a>
              <a className="text-link" href="#about">
                A little about me <Arrow />
              </a>
            </div>
            <div className="hero-location">
              <span className="location-icon">◎</span> Based in New York City{" "}
              <span className="separator">/</span> Open to analytics
              opportunities
            </div>
          </div>
          <FeaturedCarousel />
        </section>
        <div className="capability-strip">
          <span>THE TOOLKIT</span>
          <p>
            SQL <i /> Python <i /> R <i /> Tableau <i /> Excel <i /> PySpark
          </p>
          <span>Curiosity connects the dots.</span>
        </div>
        <section id="projects" className="section work-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow"> / SELECTED WORK</p>
              <h2>
                Good questions.
                <br />
                <span>Practical answers.</span>
              </h2>
            </div>
            <p>
              Four projects, from everyday prices to public data. Each connects
              a real question with a working analysis or tool.
            </p>
          </div>
          <div className="work-controls">
            <div className="filters" role="group" aria-label="Filter projects">
              {["All work", "Analytics", "Machine Learning", "Applied AI"].map(
                (item) => (
                  <button
                    key={item}
                    className={filter === item ? "filter active" : "filter"}
                    onClick={() => setFilter(item)}
                    aria-pressed={filter === item}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
            <span className="result-count" aria-live="polite">
              {visible.length} projects
            </span>
          </div>
          <div className="project-grid">
            {visible.map((project) => (
              <article
                className={`project-card project-${project.id}`}
                key={project.id}
              >
                <Link
                  className="project-visual"
                  to={project.path}
                  aria-label={project.action + ": " + project.name}
                >
                  <ProjectVisual id={project.id} />
                  <span className="visual-open">
                    <Arrow />
                  </span>
                </Link>
                <div className="project-copy">
                  <div className="project-meta">
                    <span>{project.category}</span>
                  </div>
                  <h3>
                    <Link to={project.path}>{project.title}</Link>
                  </h3>
                  <p>{project.description}</p>
                  <div className="project-tools">{project.tools}</div>
                  <Link className="project-link" to={project.path}>
                    {project.action} <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="experience" className="section home-experience">
          <div className="experience-intro">
            <p className="eyebrow"> / EXPERIENCE</p>
            <h2>
              Business context.
              <br />
              <span>Analytical thinking.</span>
            </h2>
            <p>
              Four years in HR and People Operations taught me how organizations
              work. Now I bring that perspective to their data.
            </p>
            <Link to="/experience" className="text-link">
              View my full experience <Arrow />
            </Link>
          </div>
          <div className="career-list">
            <article>
              <span className="career-date">JUN — AUG 2026</span>
              <h3>The Pep Room</h3>
              <span className="career-role">Data Intern</span>
              <p>
                Built Excel sales dashboards across 18 products, reconciled
                sales exports, and supported inventory decisions.
              </p>
              <span className="career-tools">
                Excel · Power Query · Sales analytics
              </span>
            </article>
            <article>
              <span className="career-date">FEB — MAY 2026</span>
              <h3>NYC Department for the Aging</h3>
              <span className="career-role">Data Analytics Intern</span>
              <p>
                Investigated migration discrepancies with SQL and Tableau,
                identifying approximately 22 missing meal-service entries per
                day during the month reviewed.
              </p>
              <span className="career-tools">
                SQL Server · Tableau · Data validation
              </span>
            </article>
            <article>
              <span className="career-date">2019 — 2024</span>
              <h3>A foundation in people & operations</h3>
              <span className="career-role">
                VML · Purpose Campaigns · Greater Than One
              </span>
              <p>
                Employee records, workforce reporting, and the everyday
                processes that make data quality matter.
              </p>
            </article>
          </div>
        </section>
        <section id="about" className="section about">
          <div className="about-image">
            <img
              src="/images/about-photo.jpg"
              alt="Tenchi Chen"
              loading="lazy"
              width="600"
              height="750"
            />
            <span>Tenchi Chen / New York, NY</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow"> / THE PERSON BEHIND THE WORK</p>
            <h2>
              Curious about the data.
              <br />
              <span>Grounded in the real world.</span>
            </h2>
            <p>
              I’m Tenchi, a Business Analytics graduate making the move from
              people operations into data analytics.
            </p>
            <p>
              I like the investigative part of the work: tracing a discrepancy,
              connecting sources, and finding the explanation behind a pattern.
              Just as much, I care about making the result understandable to the
              people who need it.
            </p>
            <p>
              My work spans public-sector data validation, sales and inventory
              reporting, geospatial analysis, and practical automation.
            </p>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/tenchi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn <Arrow />
            </a>
          </div>
        </section>
        <section id="contact" className="contact">
          <div>
            <p className="eyebrow">
              <span className="status-dot" /> LET’S CONNECT
            </p>
            <h2>
              Have a question
              <br />
              worth <em>exploring?</em>
            </h2>
            <p>
              I’m looking for my next opportunity in data and business
              analytics.
              <br />
              Let’s talk about where I could contribute.
            </p>
            <a className="contact-email" href="mailto:chentenchi@gmail.com">
              chentenchi@gmail.com <Arrow />
            </a>
          </div>
          <div className="contact-aside">
            <span>FIND ME ELSEWHERE</span>
            <a
              href="https://www.linkedin.com/in/tenchi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <Arrow />
            </a>
            <a
              href="https://github.com/chentenchi"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <Arrow />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
