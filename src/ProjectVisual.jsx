import { useId } from "react";
import Papa from "papaparse";
import pricesCsv from "../public/data/price_history.csv?raw";

// The preview uses the same checked-in observations as the full dashboard.
const observations = Papa.parse(pricesCsv, {
  header: true,
  skipEmptyLines: true,
}).data;
const dates = [...new Set(observations.map((row) => row.snapshot_date))].sort();
const basket = dates.map((date) => ({
  date,
  total: observations
    .filter((row) => row.snapshot_date === date)
    .reduce((sum, row) => sum + Number(row.effective_price), 0),
}));
const latest = basket.at(-1);
const totals = basket.map((row) => row.total);
const minimum = Math.min(...totals) - 2;
const maximum = Math.max(...totals) + 2;
const chartPoints = basket
  .map(
    (row, index) =>
      `${20 + (index / Math.max(1, basket.length - 1)) * 540},${160 - ((row.total - minimum) / (maximum - minimum)) * 125}`,
  )
  .join(" ");

function GroceryPreview() {
  const gradientId = useId();
  return (
    <div className="basket-preview">
      <div className="preview-toolbar">
        <span>
          <i className="tiny-mark" /> BASKET MONITOR
        </span>
        <span>Historical snapshot</span>
      </div>
      <div className="basket-heading">
        <div>
          <span className="micro-label">RECORDED BASKET COST</span>
          <strong>${latest.total.toFixed(2)}</strong>
        </div>
        <span className="basket-date">
          {new Date(`${latest.date}T12:00:00`).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          <br />
          One package per tracked product
        </span>
      </div>
      <svg
        className="basket-chart"
        viewBox="0 0 580 190"
        role="img"
        aria-label={`Historical basket cost across ${dates.length} observation dates; latest cost $${latest.total.toFixed(2)}. Vertical range $${minimum.toFixed(2)} to $${maximum.toFixed(2)}.`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity=".22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[35, 80, 125, 170].map((y) => (
          <line
            key={y}
            x1="20"
            x2="560"
            y1={y}
            y2={y}
            stroke="currentColor"
            strokeDasharray="3 5"
          />
        ))}
        <polygon
          points={`20,180 ${chartPoints} 560,180`}
          fill={`url(#${gradientId})`}
        />
        <polyline
          points={chartPoints}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
      <div className="chart-dates">
        <span>{dates[0]}</span>
        <span>{latest.date}</span>
      </div>
      <div className="preview-bottom">
        <span>
          <i /> Kroger basket · USD
        </span>
        <span>Python → CSV → Dashboard</span>
      </div>
    </div>
  );
}

export default function ProjectVisual({ id }) {
  if (id === "grocery") return <GroceryPreview />;
  if (id === "forest")
    return (
      <div className="forest-preview">
        <img
          src="/images/forest-nyc-trees.png"
          alt="Original R visualization of NYC tree locations and City Council districts"
          loading="lazy"
        />
        <div>
          <span className="micro-label">QUEENS · DISTRICT 32</span>
          <strong>
            ~28<span>%</span>
          </strong>
          <p>of trees recorded as dead</p>
          <small>2025 coursework dataset</small>
        </div>
      </div>
    );
  if (id === "clash")
    return (
      <div className="model-preview">
        <div className="preview-toolbar">
          <span>MODEL EVALUATION</span>
          <span>Logistic regression</span>
        </div>
        <div className="model-numbers">
          <div>
            <strong>0.6823</strong>
            <span>ROC AUC</span>
          </div>
          <div>
            <strong>
              63.62<span>%</span>
            </strong>
            <span>Accuracy</span>
          </div>
        </div>
        <div className="pipeline-preview">
          <span>Battle data</span>
          <b>→</b>
          <span>Features</span>
          <b>→</b>
          <span>Prediction</span>
        </div>
        <p>PySpark + Google Cloud · 15 seasons of battle data</p>
      </div>
    );
  return (
    <div className="document-preview">
      <div className="sample-paper">
        <span>FICTIONAL SAMPLE</span>
        <strong>Tax notice</strong>
        <div className="paper-rule" />
        <p>Notice CP14</p>
        <p>Tax period: 2025</p>
        <div className="paper-rule short" />
        <div className="paper-rule" />
      </div>
      <span className="extract-arrow">→</span>
      <div className="extracted-preview">
        <span className="micro-label">STRUCTURED OUTPUT</span>
        <div>
          <span>Notice</span>
          <b>CP14</b>
        </div>
        <div>
          <span>Jurisdiction</span>
          <b>Federal</b>
        </div>
        <div>
          <span>Total due</span>
          <b>$575.00</b>
        </div>
        <small>
          <i /> Sample fields extracted
        </small>
      </div>
    </div>
  );
}
