import "./App.css";
import "./UrbanForest.css";
import { Header, CaseFooter } from "./SiteLayout.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const reportUrl = "https://chentenchi.github.io/STA9750-2025-FALL/mp03.html";

const sourceUrl =
  "https://github.com/chentenchi/STA9750-2025-FALL/blob/main/mp03.qmd";

const methods = [
  {
    number: "01",
    title: "Data acquisition",
    description:
      "Collected NYC tree locations and City Council district boundaries using public datasets and APIs. Retrieved additional forestry work-order and assessment data.",
  },
  {
    number: "02",
    title: "Geospatial analysis",
    description:
      "Used R and the sf package to spatially join tree locations with council districts, then calculated tree counts, density and the percentage recorded as dead.",
  },
  {
    number: "03",
    title: "Visualization",
    description:
      "Created district comparisons, geographic visualizations and interactive Leaflet maps to investigate differences in tree coverage and condition.",
  },
];
const districtComparison = [
  {
    district: "Manhattan 10",
    trees: 4666,
    deadPct: 14.6,
  },
  {
    district: "Manhattan 2",
    trees: 1470,
    deadPct: 15.0,
  },
  {
    district: "Queens 32",
    trees: 1936,
    deadPct: 28.2,
  },
  {
    district: "Staten Island 50",
    trees: 6467,
    deadPct: 16.5,
  },
];

function UrbanForest() {
  return (
    <div id="top" className="site case-site">
      <Header />

      <main tabIndex={-1} id="main-content">
        <article className="section forest-page">
          <div className="forest-hero">
            <p className="eyebrow">R PROJECT / GEOSPATIAL ANALYSIS</p>

            <h1>Mapping NYC's Urban Forest</h1>

            <p className="forest-intro">
              An analysis of New York City's street trees, examining how tree
              coverage and condition vary across City Council districts.
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

          <section className="forest-methodology">
            <p className="eyebrow">METHODOLOGY</p>
            <h2>From public data to geographic insights</h2>

            <div className="forest-method-grid">
              {methods.map((method) => (
                <div className="forest-method-card" key={method.number}>
                  <span className="forest-method-number">{method.number}</span>

                  <h3>{method.title}</h3>

                  <p>{method.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          <section className="forest-overview">
            <p className="eyebrow">PROJECT OVERVIEW</p>
            <h2>Where does NYC's tree canopy need attention?</h2>

            <p>
              This coursework project combined public tree records with City
              Council district boundaries to examine the distribution and
              condition of trees across New York City.
            </p>

            <p>
              The analysis identified Queens District 32 as an area of interest
              and developed a proposed tree-maintenance program using the
              findings.
            </p>

            <figure className="forest-chart forest-map-card">
              <img
                 className="forest-map-image forest-map-image-dark"
                 src="/images/forest-nyc-trees.png"
                 alt="Map of NYC tree locations plotted over City Council district boundaries"
                 loading="lazy"
               />

           <figcaption>
             NYC tree locations and City Council district boundaries,
             visualized using R, sf and ggplot2.
           </figcaption>

           <a
             href="/view/tree-map"
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
                <span className="forest-metric-value">1,936</span>
                <span className="forest-metric-label">Recorded trees</span>
              </div>

              <div className="forest-metric">
                <span className="forest-metric-value">~28%</span>
                <span className="forest-metric-label">Recorded as dead</span>
              </div>
            </div>

            <figure className="forest-comparison">
  <div className="forest-comparison-grid">

    <div className="forest-comparison-panel">
      <div className="forest-comparison-heading">
        <span>CONDITION</span>
        <h3>Dead trees (%)</h3>
        <p>Share of recorded trees marked as dead</p>
      </div>

      <div className="forest-comparison-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={districtComparison}
            layout="vertical"
            margin={{ top: 8, right: 50, bottom: 5, left: 5 }}
          >
            <CartesianGrid
              stroke="var(--line)"
              strokeDasharray="3 3"
              horizontal={false}
            />

            <XAxis
              type="number"
              domain={[0, 30]}
              tickFormatter={(value) => `${value}%`}
              stroke="var(--muted)"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />

            <YAxis
              type="category"
              dataKey="district"
              width={105}
              stroke="var(--muted)"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />

            <Tooltip
              cursor={{ fill: "rgba(255, 255, 255, 0.04)" }}
              contentStyle={{
                  background: "#1c1c1c",
                  border: "1px solid #3a3a3a",
                  borderRadius: 6,
                  color: "#f5f5f5",
                  }}
             labelStyle={{
              color: "#f5f5f5",
               fontWeight: 600,
                }}
                temStyle={{
                  color: "#c7c7c7",
               }}
                formatter={(value) => [
                    `${Number(value).toFixed(1)}%`,
                 "Recorded dead",
                   ]}
             />
            <Bar
              dataKey="deadPct"
              barSize={22}
              radius={[0, 4, 4, 0]}
              isAnimationActive={false}
            >
              {districtComparison.map((entry) => (
                <Cell
                  key={entry.district}
                  fill={
                    entry.district === "Queens 32"
                      ? "var(--accent)"
                      : "var(--line-strong)"
                  }
                />
              ))}

              <LabelList
                dataKey="deadPct"
                position="right"
                formatter={(value) => `${Number(value).toFixed(1)}%`}
                style={{
                  fill: "var(--text-secondary)",
                  fontSize: 11,
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="forest-comparison-panel">
      <div className="forest-comparison-heading">
        <span>VOLUME</span>
        <h3>Recorded trees</h3>
        <p>Total trees represented in the coursework dataset</p>
      </div>

      <div className="forest-comparison-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={districtComparison}
            layout="vertical"
            margin={{ top: 8, right: 58, bottom: 5, left: 5 }}
          >
            <CartesianGrid
              stroke="var(--line)"
              strokeDasharray="3 3"
              horizontal={false}
            />

            <XAxis
              type="number"
              domain={[0, 7000]}
              tickFormatter={(value) =>
                value === 0 ? "0" : `${value / 1000}k`
              }
              stroke="var(--muted)"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />

            <YAxis
              type="category"
              dataKey="district"
              width={105}
              stroke="var(--muted)"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />

              <Tooltip
                 cursor={{ fill: "rgba(255, 255, 255, 0.04)" }}
                 contentStyle={{
                  background: "#1c1c1c",
                  border: "1px solid #3a3a3a",
                   borderRadius: 6,
                   color: "#f5f5f5",
                }}
                labelStyle={{
                 color: "#f5f5f5",
                  fontWeight: 600,
                 }}
                itemStyle={{
                  color: "#c7c7c7",
                }}
                 formatter={(value) => [
                   Number(value).toLocaleString("en-US"),
                   "Recorded trees",
                 ]}
                />

            <Bar
              dataKey="trees"
              barSize={22}
              radius={[0, 4, 4, 0]}
              isAnimationActive={false}
            >
              {districtComparison.map((entry) => (
                <Cell
                  key={entry.district}
                  fill={
                    entry.district === "Queens 32"
                      ? "var(--accent)"
                      : "var(--line-strong)"
                  }
                />
              ))}

              <LabelList
                dataKey="trees"
                position="right"
                formatter={(value) =>
                  Number(value).toLocaleString("en-US")
                }
                style={{
                  fill: "var(--text-secondary)",
                  fontSize: 11,
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

  </div>

  <figcaption>
    Queens District 32 is highlighted for comparison. Source: 2025 R
    coursework analysis.
  </figcaption>
</figure>

            <p>
              In the coursework dataset, District 32 had the highest recorded
              proportion of dead trees among the council districts analyzed.
            </p>

            <p className="forest-data-note">
              Findings are from the original 2025 coursework analysis and do not
              represent current tree conditions.
            </p>
          </section>

          <section className="forest-interactive-map">
            <p className="eyebrow">INTERACTIVE ANALYSIS</p>

            <h2>Explore Queens District 32</h2>

            <p>
              Explore individual tree locations in Queens District 32. Red
              markers represent trees recorded as dead, while green markers
              represent all other recorded conditions. Zoom in or select the
              district boundary to explore the original analysis.
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

          <section className="forest-proposal">
            <p className="eyebrow">FROM ANALYSIS TO RECOMMENDATIONS</p>

            <h2>Reviving the Canopy in District 32</h2>

            <p>
              Based on the analysis, my coursework proposed a targeted
              tree-maintenance and replanting program for Queens District 32.
              The proposal included replacing dead trees, planting new trees and
              increasing risk inspections.
            </p>

            <p>
              The objective was to demonstrate how geographic analysis could
              inform the prioritization of urban forestry work. This was an
              academic proposal, not an implemented city program.
            </p>
          </section>

          <section className="forest-report">
            <h2>Explore the complete analysis</h2>

            <p>
              The original Quarto report contains the interactive district maps,
              comparison charts, R code and full project methodology.
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
      <CaseFooter next="/clash-royale" title="Clash Royale ML Pipeline" />
    </div>
  );
}

export default UrbanForest;
