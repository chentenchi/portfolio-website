import { useState } from 'react'
import './Experience.css'
import './App.css'
import { Link } from 'react-router-dom'

const experience = [
  {
    category: 'Data Analytics',
    role: 'Data Intern',
    company: 'The Pep Room',
    dates: 'Jun 2026 – Aug 2026',
    summary:
      'Developed an FDA-focused RAG solution and built Excel dashboards to analyze sales performance and business trends.',
    skills: ['Python', 'RAG', 'Excel', 'Data Visualization'],
    details: [
      'Contributed to a Retrieval-Augmented Generation solution that referenced FDA information to help verify peptide regulatory and approval status.',
      'Analyzed sales and performance data in Excel and created dashboards to track trends and product-level performance.',
      'Prepared and organized business data for reporting and analysis.'
    ]
  },
  {
    category: 'Data Analytics',
    role: 'Data Analytics Intern',
    company: 'NYC Department for the Aging',
    dates: 'Feb 2026 – May 2026',
    summary:
      'Used SQL, Tableau and Excel to investigate data migration discrepancies, identify missing records and improve reporting accuracy.',
    skills: ['SQL Server', 'Tableau', 'Tableau Prep', 'Excel'],
    details: [
      'Used Tableau to analyze program and operational data and identify reporting and data-quality issues.',
      'Compared records across systems during a data migration and identified missing information in reported meal-service data.',
      'Used Tableau Prep Builder to clean and organize datasets for dashboards and presentations.'
    ]
  },
  {
    category: 'HR & People Operations',
    role: 'People Coordinator',
    company: 'VML',
    dates: 'Nov 2023 – Jun 2024',
    summary:
      'Managed HR operations across multiple North American business units, including employee data management, benefits administration and onboarding.',
    skills: ['Workday', 'HRIS', 'Benefits', 'Onboarding'],
    details: [
      'Supported HR operations across multiple business units throughout North America.',
      'Maintained employee information across Workday, Aloha, Index and Workfront.',
      'Supported benefits requests and coordinated onboarding and offboarding for employees, contractors and temporary staff.'
    ]
  },
  {
    category: 'HR & People Operations',
    role: 'HR & Talent Coordinator',
    company: 'Purpose Campaigns',
    dates: 'Apr 2021 – Feb 2023',
    summary:
      'Supported global recruitment and HR operations, maintained employee records for over 200 employees and analyzed workforce data for reporting.',
    skills: ['Namely', 'Greenhouse', 'Recruiting', 'HR Reporting'],
    details: [
      'Supported recruiting across the US, EMEA, Brazil, India and Australia using Greenhouse and employer-of-record platforms.',
      'Maintained the Namely HRIS for more than 200 global employees and produced recurring reports and audits.',
      'Supported onboarding, benefits enrollment and employment documentation across multiple geographies.'
    ]
  },
  {
    category: 'HR & People Operations',
    role: 'People & Development Associate',
    company: 'Greater Than One',
    dates: 'Feb 2020 – Aug 2020',
    summary:
      'Supported recruitment and employee operations while developing Excel reports to track HR metrics, turnover and retention.',
    skills: ['Excel', 'HR Analytics', 'Workable', 'Recruiting'],
    details: [
      'Supported full-cycle recruiting through resume review, phone screens, interview coordination and offer preparation.',
      'Built and maintained Excel reports for HR metrics including turnover and retention.',
      'Maintained organizational charts and active employee records.'
    ]
  },
  {
    category: 'HR & People Operations',
    role: 'People & Development Intern',
    company: 'Greater Than One',
    dates: 'Aug 2019 – Jan 2020',
    summary:
      'Created Excel tools for employee reporting, supported recruitment and helped digitize personnel records across multiple offices.',
    skills: ['Excel', 'SharePoint', 'Workable', 'Reporting'],
    details: [
      'Created Excel tools for PTO tracking and performance-review reporting.',
      'Supported entry-level recruiting using Workable, including resume review, phone screens and interview scheduling.',
      'Helped digitize employee personnel files for the New York and San Francisco offices using SharePoint.'
    ]
  }
]

function Experience() {
  const [expanded, setExpanded] = useState(null)

  
return (
  <div id="top" className="site">
    <header className="header">
      <a href="/" className="logo">
        TC<span>.</span>
      </a>

      <nav aria-label="Main navigation">        
        <Link to="/#projects">Projects</Link>
        <Link to="/experience" aria-current="page">
            Experience
        </Link>
        <Link to="/#about">About</Link>
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

    <main className="experience-page">
      <section className="experience-hero">
        <p className="eyebrow">PROFESSIONAL EXPERIENCE</p>
        <h1>Experience</h1>
        <p>
          My background spans data analytics, HR operations and business
          reporting, with experience working across both technical and
          people-focused roles.
        </p>
      </section>

      {['Data Analytics', 'HR & People Operations'].map((section) => (
        <section className="experience-section" key={section}>
          <p className="eyebrow">{section.toUpperCase()}</p>

          <div className="experience-list">
            {experience
              .filter((item) => item.category === section)
              .map((item) => (
                <article className="experience-card" key={`${item.company}-${item.role}`}>
                  <div className="experience-card-top">
                    <div>
                      <h2>{item.role}</h2>
                      <p className="experience-company">{item.company}</p>
                    </div>
                    <span className="experience-dates">{item.dates}</span>
                  </div>

                  <p className="experience-summary">{item.summary}</p>

                  <div className="tags">
                    {item.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>

                  <button
                    className="details-button"
                    onClick={() =>
                      setExpanded(
                        expanded === `${item.company}-${item.role}`
                          ? null
                          : `${item.company}-${item.role}`
                      )
                    }
                  >
                    {expanded === `${item.company}-${item.role}`
                      ? 'Show less −'
                      : 'View details +'}
                  </button>

                  {expanded === `${item.company}-${item.role}` && (
                    <ul className="experience-details">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
          </div>
        </section>
      ))}
    </main>
      </div>
  )
}

export default Experience