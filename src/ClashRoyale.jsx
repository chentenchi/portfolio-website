import { Header, CaseFooter } from "./SiteLayout.jsx";
import { useState } from "react";
import "./ClashRoyale.css";

const pipelineStages = [
  {
    title: "Data collection",
    description:
      "Downloaded 15 seasons of historical Clash Royale battle data from Kaggle and uploaded the files to Google Cloud Storage. The dataset included player trophies, crowns, and both players’ eight-card decks.",
    tools: ["Kaggle", "Google Cloud Storage", "Google Cloud CLI"],
    output: "Raw battle data stored in Google Cloud Storage",
  },
  {
    title: "Preprocessing",
    description:
      "Explored the dataset, checked for missing values, and saved the records as Parquet files. Removed unnecessary columns and created a binary target indicating whether Player 1 won the match.",
    tools: ["Python", "Pandas", "PySpark", "Parquet"],
    output: "Prepared Parquet files and binary prediction target",
  },
  {
    title: "Feature engineering",
    description:
      "Used StringIndexer and OneHotEncoder to transform card IDs into categorical features. Standardized player trophy counts and combined the transformed features into vectors using PySpark.",
    tools: [
      "StringIndexer",
      "OneHotEncoder",
      "StandardScaler",
      "VectorAssembler",
    ],
    output: "Engineered feature vectors saved as Parquet",
  },
  {
    title: "Model training",
    description:
      "Trained a logistic regression model using Spark MLlib. Due to memory constraints, sampled 10% of the processed data, applied a 70/30 train-test split, and used three-fold cross-validation to tune the model.",
    tools: ["Spark MLlib", "Logistic Regression", "CrossValidator"],
    output: "Trained and saved logistic regression model",
  },
  {
    title: "Model evaluation",
    description:
      "Evaluated the model using ROC AUC, accuracy, precision, recall, F1 score, and a confusion matrix. The reported results included 0.6823 ROC AUC and 63.62% accuracy.",
    tools: ["BinaryClassificationEvaluator", "scikit-learn", "Matplotlib"],
    output: "Performance metrics, ROC curve and confusion matrix",
  },
];

function ClashRoyale() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div id="top" className="site case-site">
      <Header />

      <main tabIndex={-1} id="main-content">
        <section className="section clash-page">
          <div className="clash-hero">
            <p className="eyebrow">MACHINE LEARNING PROJECT</p>

            <h1>Clash Royale ML Pipeline</h1>

            <p className="clash-description">
              A machine learning pipeline built with PySpark and Google Cloud to
              analyze historical Clash Royale battles and predict match
              outcomes.
            </p>

            <div className="tags">
              {[
                "Python",
                "PySpark",
                "Spark MLlib",
                "Google Cloud",
                "Logistic Regression",
              ].map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="clash-performance">
            <p className="eyebrow">MODEL PERFORMANCE</p>
            <h2>Evaluating the model</h2>

            <p>
              Model performance was evaluated using classification metrics and
              ROC analysis.
            </p>

            <div className="clash-metrics">
              <div className="clash-metric-card">
                <span>ROC AUC</span>
                <strong>0.6823</strong>
                <small>Discrimination performance</small>
              </div>

              <div className="clash-metric-card">
                <span>Accuracy</span>
                <strong>63.62%</strong>
                <small>Correctly classified matches</small>
              </div>
            </div>
          </div>

          <div className="clash-workflow">
            <p className="eyebrow">PROJECT WORKFLOW</p>
            <h2>From data to predictions</h2>

            <p>
              Select a stage to explore how the machine learning pipeline was
              developed.
            </p>

            <div className="clash-stages">
              {pipelineStages.map((stage, index) => (
                <button
                  key={stage.title}
                  type="button"
                  className={`clash-stage ${
                    activeStage === index ? "active" : ""
                  }`}
                  aria-pressed={activeStage === index}
                  onClick={() => setActiveStage(index)}
                >
                  <span>0{index + 1}</span>
                  {stage.title}
                </button>
              ))}
            </div>

            <div className="clash-stage-details">
              <h3>{pipelineStages[activeStage].title}</h3>

              <p>{pipelineStages[activeStage].description}</p>

              <div className="clash-stage-tools">
                <h4>TOOLS USED</h4>

                <div className="clash-tool-tags">
                  {pipelineStages[activeStage].tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>

              <div className="clash-stage-output">
                <h4>OUTPUT</h4>
                <p>{pipelineStages[activeStage].output}</p>
              </div>
            </div>
          </div>

          <section className="clash-visualizations">
            <p className="eyebrow">MODEL VISUALIZATIONS</p>
            <h2>Understanding model performance</h2>

            <p>
              The ROC curve illustrates how well the logistic regression model
              distinguishes Player 1 wins from non-wins (losses or ties) across
              different classification thresholds.
            </p>

            <div className="clash-chart-card">
              <h3>ROC Curve</h3>

              <img
                src="/images/clash-roc.png"
                alt="ROC curve from the Clash Royale logistic regression model"
                className="clash-roc-image clash-roc-image-dark"
                loading="lazy"
              />

              <a
                href="/view/roc-curve"
                target="_blank"
                rel="noopener noreferrer"
                className="clash-chart-enlarge"
              >
                View full-size ROC curve ↗
              </a>

              <p>
                The model achieved a ROC AUC of 0.6823, indicating moderate
                ability to distinguish between the two match outcomes.
              </p>
            </div>

            <div className="clash-chart-card">
              <div className="clash-matrix-header">
                <div>
                  <span className="clash-matrix-eyebrow">CLASSIFICATION RESULTS</span>
                  <h3>Confusion Matrix</h3>
                  <p>Actual outcomes compared with model predictions.</p>
                </div>

                <div className="clash-matrix-accuracy">
                  <span>Accuracy</span>
                  <strong>63.62%</strong>
                </div>
              </div>

              <div
                className="clash-matrix-native"
                role="img"
                aria-label="Confusion matrix for Player 1 win prediction"
              >
                <div className="matrix-empty"></div>

                <div className="matrix-column-label">
                  Predicted 0
                  <span>Non-win</span>
                </div>

                <div className="matrix-column-label">
                  Predicted 1
                  <span>Win</span>
                </div>

                <div className="matrix-row-label">
                  Actual 0
                  <span>Non-win</span>
                </div>

                <div className="matrix-cell matrix-correct">
                  <span className="matrix-result">Correct</span>
                  <strong>3,851,237</strong>
                  <span className="matrix-description">True negative</span>
                </div>

                <div className="matrix-cell">
                  <span className="matrix-result">Incorrect</span>
                  <strong>1,917,093</strong>
                  <span className="matrix-description">False positive</span>
                </div>

                <div className="matrix-row-label">
                  Actual 1
                  <span>Win</span>
                </div>

                <div className="matrix-cell">
                  <span className="matrix-result">Incorrect</span>
                  <strong>2,192,125</strong>
                  <span className="matrix-description">False negative</span>
                </div>

                <div className="matrix-cell matrix-correct">
                  <span className="matrix-result">Correct</span>
                  <strong>3,335,332</strong>
                  <span className="matrix-description">True positive</span>
                </div>
              </div>

              <p className="clash-matrix-note">
                The diagonal cells represent correct predictions. Off-diagonal cells
                represent matches the model classified incorrectly.
              </p>
            </div>
          </section>

          <section className="clash-findings">
            <p className="eyebrow">PROJECT TAKEAWAYS</p>
            <h2>Key findings & lessons learned</h2>

            <div className="clash-findings-grid">
              <div className="clash-finding-card">
                <span>01 / MODEL PERFORMANCE</span>
                <h3>Predicting match outcomes</h3>
                <p>
                  The logistic regression model achieved 63.62% accuracy and a
                  ROC AUC of 0.6823, demonstrating its ability to identify
                  patterns in historical match data.
                </p>
              </div>

              <div className="clash-finding-card">
                <span>02 / ENGINEERING CHALLENGES</span>
                <h3>Working with large datasets</h3>
                <p>
                  Memory and serialization errors required adjustments to
                  categorical feature encoding. I also reduced the modeling
                  sample to manage Google Cloud computing limitations.
                </p>
              </div>

              <div className="clash-finding-card">
                <span>03 / FUTURE IMPROVEMENTS</span>
                <h3>Improving the model</h3>
                <p>
                  Future improvements could include exploring card combinations,
                  incorporating current game balance data, and accounting for
                  card placement and timing.
                </p>
              </div>
            </div>

            <div className="clash-project-link">
              <h3>Explore the full project</h3>
              <p>
                View the source code, methodology, and project documentation on
                GitHub.
              </p>

              <a
                href="https://github.com/chentenchi/clash-royale-ml-pipeline"
                target="_blank"
                rel="noopener noreferrer"
                className="dashboard-link"
              >
                View GitHub Repository ↗
              </a>
            </div>
          </section>
        </section>
      </main>
      <CaseFooter next="/tax-assistant" title="Tax Notice Assistant" />
    </div>
  );
}

export default ClashRoyale;
