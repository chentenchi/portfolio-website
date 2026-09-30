import { Header, CaseFooter } from "./SiteLayout.jsx";

import GroceryDashboard from "./GroceryDashboard.jsx";
import "./App.css";

function GroceryTracker() {
  return (
    <div id="top" className="site case-site">
      <Header />

      <main tabIndex={-1} id="main-content">
        <section className="grocery-method section">
          <p className="eyebrow">DATA PIPELINE</p>
          <h2>From APIs to an automated analytics workflow.</h2>

          <div className="forest-method-grid">
            <div>
              <span className="eyebrow">01 / COLLECT</span>
              <h3>Automate price collection</h3>
              <p>
                A Python ETL pipeline authenticates with the Kroger API and
                retrieves regular and promotional prices for 22 tracked products.
                Windows Task Scheduler runs the collection automatically to build
                a historical price dataset over time.
              </p>
            </div>

            <div>
              <span className="eyebrow">02 / TRANSFORM & STORE</span>
              <h3>Make the data comparable</h3>
              <p>
                New observations are cleaned and stored in SQLite and historical
                CSV files. Package prices are normalized into comparable units
                such as price per pound, gallon, or dozen and matched with
                available BLS food-price benchmarks.
              </p>
            </div>

            <div>
              <span className="eyebrow">03 / ANALYZE</span>
              <h3>Build the reporting layer</h3>
              <p>
                The pipeline rebuilds Tableau-ready datasets used to analyze
                basket cost, promotions, product-level price history, and Kroger
                prices against BLS benchmarks. This portfolio uses a saved
                snapshot rather than requesting live store prices.
              </p>
            </div>
          </div>
          <a
            className="primary-button"
            href="https://github.com/chentenchi/Grocery-Price-Tracker"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the source code ↗
          </a>
        </section>
        <GroceryDashboard />

      </main>
      <CaseFooter next="/urban-forest" title="Mapping NYC’s Urban Forest" />
    </div>
  );
}

export default GroceryTracker;
