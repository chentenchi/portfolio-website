import { useState } from 'react'
import './ClashRoyale.css'



const pipelineStages = [
  {
    title: 'Data collection',
    description:
      'Downloaded 15 seasons of historical Clash Royale battle data from Kaggle and uploaded the files to Google Cloud Storage. The dataset included player trophies, crowns, and both players’ eight-card decks.',
    tools: ['Kaggle', 'Google Cloud Storage', 'Google Cloud CLI'],
    output: 'Raw battle data stored in Google Cloud Storage'
  },
  {
    title: 'Preprocessing',
    description:
      'Explored the dataset, checked for missing values, and saved the records as Parquet files. Removed unnecessary columns and created a binary target indicating whether Player 1 won the match.',
    tools: ['Python', 'Pandas', 'PySpark', 'Parquet'],
    output: 'Prepared Parquet files and binary prediction target'
  },
  {
    title: 'Feature engineering',
    description:
      'Used StringIndexer and OneHotEncoder to transform card IDs into categorical features. Standardized player trophy counts and combined the transformed features into vectors using PySpark.',
    tools: [
      'StringIndexer',
      'OneHotEncoder',
      'StandardScaler',
      'VectorAssembler'
    ],
    output: 'Engineered feature vectors saved as Parquet'
  },
  {
    title: 'Model training',
    description:
      'Trained a logistic regression model using Spark MLlib. Due to memory constraints, sampled 10% of the processed data, applied a 70/30 train-test split, and used three-fold cross-validation to tune the model.',
    tools: [
      'Spark MLlib',
      'Logistic Regression',
      'CrossValidator'
    ],
    output: 'Trained and saved logistic regression model'
  },
  {
    title: 'Model evaluation',
    description:
      'Evaluated the model using ROC AUC, accuracy, precision, recall, F1 score, and a confusion matrix. The reported results included 0.6823 ROC AUC and 63.62% accuracy.',
    tools: [
      'BinaryClassificationEvaluator',
      'scikit-learn',
      'Matplotlib'
    ],
    output: 'Performance metrics, ROC curve and confusion matrix'
  }
]

function ClashRoyale() {
  const [activeStage, setActiveStage] = useState(0)

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
      <section className="section clash-page">
      <div className="clash-hero">
        <p className="eyebrow">MACHINE LEARNING PROJECT</p>

        <h1>Clash Royale ML Pipeline</h1>

        <p className="clash-description">
          A machine learning pipeline built with PySpark
          and Google Cloud to analyze historical Clash Royale
          battles and predict match outcomes.
        </p>

        <div className="tags">
          {[
            'Python',
            'PySpark',
            'Spark MLlib',
            'Google Cloud',
            'Logistic Regression'
          ].map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>

      <div className="clash-performance">
        <p className="eyebrow">MODEL PERFORMANCE</p>
        <h2>Evaluating the model</h2>

        <p>
          Model performance was evaluated using
          classification metrics and ROC analysis.
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
    Select a stage to explore how the machine learning
    pipeline was developed.
  </p>

  <div className="clash-stages">
    {pipelineStages.map((stage, index) => (
      <button
        key={stage.title}
        type="button"
        className={`clash-stage ${
          activeStage === index ? 'active' : ''
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
  The ROC curve illustrates how well the logistic
  regression model distinguishes Player 1 wins from
  non-wins (losses or ties) across different
  classification thresholds.
</p>

  <div className="clash-chart-card">
    <h3>ROC Curve</h3>

    <img
      src="/images/clash-roc.png"
      alt="ROC curve from the Clash Royale logistic regression model"
      className="clash-roc-image"
      loading="lazy"
    />

    <p>
      The model achieved a ROC AUC of 0.6823,
      indicating moderate ability to distinguish
      between the two match outcomes.
    </p>
  </div>

<div className="clash-chart-card">
  
<h3>Confusion Matrix</h3>

  <img
    src="/images/clash-confusion.png"
    alt="Reconstructed confusion matrix for Player 1 win predictions"
    className="clash-roc-image"
    loading="lazy"
  />

  
<p>
  Recreated from the model evaluation results documented
  in my original project report. The matrix illustrates
  correct and incorrect predictions for Player 1's
  match outcome.
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
        The logistic regression model achieved
        63.62% accuracy and a ROC AUC of 0.6823,
        demonstrating its ability to identify
        patterns in historical match data.
      </p>
    </div>

    <div className="clash-finding-card">
      <span>02 / ENGINEERING CHALLENGES</span>
      <h3>Working with large datasets</h3>
      <p>
        Memory and serialization errors required
        adjustments to categorical feature encoding.
        I also reduced the modeling sample to manage
        Google Cloud computing limitations.
      </p>
    </div>

    <div className="clash-finding-card">
      <span>03 / FUTURE IMPROVEMENTS</span>
      <h3>Improving the model</h3>
      <p>
        Future improvements could include exploring
        card combinations, incorporating current
        game balance data, and accounting for
        card placement and timing.
      </p>
    </div>
  </div>

  <div className="clash-project-link">
    <h3>Explore the full project</h3>
    <p>
      View the source code, methodology, and
      project documentation on GitHub.
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
</div>
)
}

export default ClashRoyale