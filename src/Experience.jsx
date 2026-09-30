import { Header, CaseFooter } from "./SiteLayout.jsx";
import { useState } from "react";
import "./Experience.css";
import "./App.css";

const experience = [
  {
    category: "Data Analytics",
    role: "Data Intern",
    company: "The Pep Room",
    dates: "Jun 2026 – Aug 2026",
    summary:
      "Built Excel sales dashboards covering 18 products, supported inventory decisions, and contributed to an FDA-focused AI research tool.",
    skills: [
      "Excel",
      "Power Query",
      "Sales Analytics",
      "Inventory Reporting",
      "RAG",
    ],
    details: [
      "Built Excel dashboards using PivotTables, XLOOKUP, SUMIFS and slicers to analyze 18 products with up to two years of sales history. The reporting helped guide inventory decisions as the estimated product-expiration rate decreased from 8.5% to 6.8%.",
      "Identified weekly top-selling products and shared sales trends with the company to support inventory ordering and reduce the risk of stockouts.",
      "Cleaned and reconciled sales exports using Power Query and Excel data-validation checks to improve reporting accuracy.",
      "Supported development of an FDA-focused Retrieval-Augmented Generation (RAG) tool to research peptide approval and regulatory status.",
    ],
  },
  {
    category: "Data Analytics",
    role: "Data Analytics Intern",
    company: "NYC Department for the Aging",
    dates: "Feb 2026 – May 2026",
    summary:
      "Investigated a data migration using SQL Server and Tableau, identifying approximately 22 missing meal-service entries per day during the month reviewed.",
    skills: [
      "SQL Server",
      "SSMS",
      "Tableau",
      "Tableau Prep",
      "Data Validation",
    ],
    details: [
      "Compared records from legacy and replacement systems using SQL Server Management Studio, identifying approximately 22 missing meal-service entries per day during the month reviewed.",
      "Cleaned, joined and standardized data across 11 service categories using Tableau Prep Builder, then built Tableau analyses of meal-service trends and data quality.",
      "Documented the discrepancies, presented supporting SQL and Tableau findings, and recommended manual reconciliation to improve annual reporting accuracy.",
    ],
  },

  {
    category: "HR & People Operations",
    role: "People Coordinator",
    company: "VML",
    dates: "Nov 2023 – Jun 2024",
    summary:
      "Coordinated HR operations across multiple North American business units, managing employee records, benefits administration, and onboarding processes.",
    skills: ["Workday", "HRIS", "Benefits", "Onboarding", "HR Operations"],
    details: [
      "Maintained employee information across Workday, Aloha, Index, and Workfront, supporting accurate HR records and day-to-day operations.",
      "Coordinated onboarding and offboarding for employees, contractors, and temporary staff across multiple business units.",
      "Supported benefits administration and employee requests while working with HR teams across North America.",
    ],
  },
  {
    category: "HR & People Operations",
    role: "HR & Talent Coordinator",
    company: "Purpose Campaigns",
    dates: "Apr 2021 – Feb 2023",
    summary:
      "Supported global recruitment and HR operations, maintained records for more than 200 employees, and prepared recurring workforce reports.",
    skills: ["Namely", "Greenhouse", "Recruiting", "HR Reporting", "HRIS"],
    details: [
      "Coordinated recruitment across the US and international teams, using Greenhouse to support hiring and candidate management.",
      "Maintained HRIS records for more than 200 global employees in Namely and prepared recurring HR reports and audits.",
      "Supported onboarding, benefits enrollment, and employee documentation across multiple geographic regions.",
    ],
  },
  {
    category: "HR & People Operations",
    role: "People & Development Associate",
    company: "Greater Than One",
    dates: "Feb 2020 – Aug 2020",
    summary:
      "Supported recruitment and employee operations while developing Excel reports to track HR metrics, turnover and retention.",
    skills: ["Excel", "HR Analytics", "Workable", "Recruiting"],
    details: [
      "Supported full-cycle recruiting through resume review, phone screens, interview coordination and offer preparation.",
      "Built and maintained Excel reports for HR metrics including turnover and retention.",
      "Maintained organizational charts and active employee records.",
    ],
  },
  {
    category: "HR & People Operations",
    role: "People & Development Intern",
    company: "Greater Than One",
    dates: "Aug 2019 – Jan 2020",
    summary:
      "Created Excel tools for employee reporting, supported recruitment and helped digitize personnel records across multiple offices.",
    skills: ["Excel", "SharePoint", "Workable", "Reporting"],
    details: [
      "Created Excel tools for PTO tracking and performance-review reporting.",
      "Supported entry-level recruiting using Workable, including resume review, phone screens and interview scheduling.",
      "Helped digitize employee personnel files for the New York and San Francisco offices using SharePoint.",
    ],
  },
];

function Experience() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div id="top" className="site case-site">
      <Header />

      <main tabIndex={-1} id="main-content" className="experience-page">
        <section className="experience-hero">
          <p className="eyebrow">PROFESSIONAL EXPERIENCE</p>
          <h1>Experience</h1>
          <p>
            My background spans data analytics, HR operations and business
            reporting, with experience working across both technical and
            people-focused roles.
          </p>
        </section>

        {["Data Analytics", "HR & People Operations"].map((section) => (
          <section className="experience-section" key={section}>
            <p className="eyebrow">{section.toUpperCase()}</p>

            <div className="experience-list">
              {experience
                .filter((item) => item.category === section)
                .map((item) => (
                  <article
                    className="experience-card"
                    key={`${item.company}-${item.role}`}
                  >
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
                      aria-expanded={
                        expanded === `${item.company}-${item.role}`
                      }
                      onClick={() =>
                        setExpanded(
                          expanded === `${item.company}-${item.role}`
                            ? null
                            : `${item.company}-${item.role}`,
                        )
                      }
                    >
                      {expanded === `${item.company}-${item.role}`
                        ? "Show less −"
                        : "View details +"}
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
      <CaseFooter next="/grocery-price-tracker" title="Grocery Price Tracker" />
    </div>
  );
}

export default Experience;
