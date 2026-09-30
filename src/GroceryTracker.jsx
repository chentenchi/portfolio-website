import { Header, CaseFooter } from "./SiteLayout.jsx";

import GroceryDashboard from "./GroceryDashboard.jsx";
import "./App.css";

function GroceryTracker() {
  return (
    <div id="top" className="site case-site">
      <Header />

      <main tabIndex={-1} id="main-content">
        <GroceryDashboard />
        <section className="grocery-method section">
          <p className="eyebrow">BEHIND THE DASHBOARD</p>
          <h2>From raw prices to a comparable basket.</h2>
          <div className="forest-method-grid">
            <div>
              <span className="eyebrow">01 / COLLECT</span>
              <h3>Build the history</h3>
              <p>
                A Python pipeline collects product pricing observations. The
                portfolio shows the saved dataset, rather than live store
                prices.
              </p>
            </div>
            <div>
              <span className="eyebrow">02 / STANDARDIZE</span>
              <h3>Compare like units</h3>
              <p>
                Package prices are normalized to units such as pounds or
                gallons, then matched with the available BLS category benchmark.
              </p>
            </div>
            <div>
              <span className="eyebrow">03 / EXPLORE</span>
              <h3>Make changes visible</h3>
              <p>
                The original Tableau dashboard and this interactive view make it
                easier to explore basket costs and individual product histories.
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
      </main>
      <CaseFooter next="/urban-forest" title="Mapping NYC’s Urban Forest" />
    </div>
  );
}

export default GroceryTracker;
