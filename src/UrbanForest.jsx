import './App.css'
import './UrbanForest.css'

const reportUrl =
  'https://chentenchi.github.io/STA9750-2025-FALL/mp03.html'

const sourceUrl =
  'https://github.com/chentenchi/STA9750-2025-FALL/blob/main/mp03.qmd'

const methods = [
  {
    number: '01',
    title: 'Data acquisition',
    description:
      'Collected NYC tree locations and City Council district boundaries using public datasets and APIs. Retrieved additional forestry work-order and assessment data.'
  },
  {
    number: '02',
    title: 'Geospatial analysis',
    description:
      'Used R and the sf package to spatially join tree locations with council districts, then calculated tree counts, density and the percentage recorded as dead.'
  },
  {
    number: '03',
    title: 'Visualization',
    description:
      'Created district comparisons, geographic visualizations and interactive Leaflet maps to investigate differences in tree coverage and condition.'
  }
]

function UrbanForest() {
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
        <article className="section forest-page">
          <div className="forest-hero">
            <p className="eyebrow">
              R PROJECT / GEOSPATIAL ANALYSIS
            </p>

            <h1>Mapping NYC's Urban Forest</h1>

            <p className="forest-intro">
              An analysis of New York City's street trees,
              examining how tree coverage and condition
              vary across City Council districts.
            </p>

            <div className="forest-tags">
              <span>R</span>
              <span>sf</span>
              <span>ggplot2</span>
              <span>Leaflet</span>
              <span>Quarto</span>
            </div>

            <div className="forest-actions">
              <a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="forest-primary-link"
              >
                Explore the full report ↗
              </a>

              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="forest-secondary-link"
              >
                View R source ↗
              </a>
            </div>
          </div>

          <section className="forest-overview">
            <p className="eyebrow">PROJECT OVERVIEW</p>
            <h2>Where does NYC's tree canopy need attention?</h2>

            <p>
              This coursework project combined public tree
              records with City Council district boundaries
              to examine the distribution and condition of
              trees across New York City.
            </p>

            <p>
              The analysis identified Queens District 32
              as an area of interest and developed a
              proposed tree-maintenance program using the
              findings.
            </p>

<figure className="forest-chart">
  <img
    src="/images/forest-nyc-trees.png"
    alt="Map of NYC tree locations plotted over City Council district boundaries"
    loading="lazy"
  />

  <figcaption>
    NYC tree locations and City Council district boundaries,
    visualized using R, sf and ggplot2.
  </figcaption>

  <a
    href="/images/forest-nyc-trees.png"
    target="_blank"
    rel="noopener noreferrer"
  >
    View full-size map ↗
  </a>
</figure>
          </section>

          <section className="forest-findings">
            <p className="eyebrow">KEY FINDING</p>
            <h2>A closer look at Queens District 32</h2>

            <div className="forest-metrics">
              <div className="forest-metric">
                <span className="forest-metric-value">
                  1,936
                </span>
                <span className="forest-metric-label">
                  Recorded trees
                </span>
              </div>

              <div className="forest-metric">
                <span className="forest-metric-value">
                  ~28%
                </span>
                <span className="forest-metric-label">
                  Recorded as dead
                </span>
              </div>
            </div>

<figure className="forest-chart">
  <img
    src="/images/forest-district-comparison.png"
    alt="Comparison of total tree counts and dead-tree percentages across four NYC Council districts"
    loading="lazy"
  />

  <figcaption>
    Tree counts and dead-tree percentages across four
    selected NYC Council districts. Source: My 2025
    R coursework analysis.
  </figcaption>

  <a
    href="/images/forest-district-comparison.png"
    target="_blank"
    rel="noopener noreferrer"
  >
    View full-size chart ↗
  </a>
</figure>

            <p>
              In the coursework dataset, District 32
              had the highest recorded proportion of
              dead trees among the council districts
              analyzed.
            </p>

            <p className="forest-data-note">
              Findings are from the original 2025
              coursework analysis and do not represent
              current tree conditions.
            </p>
          </section>

<section className="forest-interactive-map">
  <p className="eyebrow">INTERACTIVE ANALYSIS</p>

  <h2>Explore Queens District 32</h2>

  <p>
    Explore individual tree locations in Queens District 32.
    Red markers represent trees recorded as dead, while
    green markers represent all other recorded conditions.
    Zoom in or select the district boundary to explore
    the original analysis.
  </p>

  <div className="forest-map-container">
    <iframe
      src="/maps/forest-district32-map.html"
      title="Interactive map of tree conditions in Queens Council District 32"
      className="forest-map-frame"
      loading="lazy"
    />
  </div>

  <div className="forest-map-footer">
    <span>
      Source: NYC Parks tree data, 2025 coursework analysis.
    </span>

    <a
      href="/maps/forest-district32-map.html"
      target="_blank"
      rel="noopener noreferrer"
    >
      Open full-screen map ↗
    </a>
  </div>
</section>

          <section className="forest-methodology">
            <p className="eyebrow">METHODOLOGY</p>
            <h2>From public data to geographic insights</h2>

            <div className="forest-method-grid">
              {methods.map((method) => (
                <div
                  className="forest-method-card"
                  key={method.number}
                >
                  <span className="forest-method-number">
                    {method.number}
                  </span>

                  <h3>{method.title}</h3>

                  <p>{method.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="forest-proposal">
            <p className="eyebrow">
              FROM ANALYSIS TO RECOMMENDATIONS
            </p>

            <h2>Reviving the Canopy in District 32</h2>

            <p>
              Based on the analysis, my coursework
              proposed a targeted tree-maintenance and
              replanting program for Queens District 32.
              The proposal included replacing dead trees,
              planting new trees and increasing risk
              inspections.
            </p>

            <p>
              The objective was to demonstrate how
              geographic analysis could inform the
              prioritization of urban forestry work.
              This was an academic proposal, not an
              implemented city program.
            </p>
          </section>

          <section className="forest-report">
            <h2>Explore the complete analysis</h2>

            <p>
              The original Quarto report contains the
              interactive district maps, comparison
              charts, R code and full project methodology.
            </p>

            <div className="forest-actions">
              <a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="forest-primary-link"
              >
                View interactive report ↗
              </a>

              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="forest-secondary-link"
              >
                View source code ↗
              </a>
            </div>
          </section>
        </article>
      </main>
    </div>
  )
}

export default UrbanForest