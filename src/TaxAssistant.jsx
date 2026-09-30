import { Header, CaseFooter } from "./SiteLayout.jsx";
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "./App.css";
import "./TaxAssistant.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// Fields from the original Tax Notice Assistant project
const fields = [
  ["fileName", "File Name"],
  ["accountName", "Account Name"],
  ["entityType", "Entity Type"],
  ["entityId", "Entity ID"],
  ["noticeId", "Notice ID Number"],
  ["jurisdiction", "Jurisdiction"],
  ["stateId", "State ID"],
  ["category", "Notice Category"],
  ["taxPeriod", "Tax Period"],
  ["issuanceDate", "Issuance Date"],
  ["context", "Context"],
  ["dueDate", "Response / Payment Due Date"],
  ["taxDue", "Tax Due"],
  ["interest", "Interest"],
  ["penalty", "Penalty"],
  ["other", "Other"],
  ["payments", "Payments Made"],
  ["preCredit", "Credit (Pre-Notice)"],
  ["postCredit", "Credit (Post-Notice)"],
  ["totalDue", "Total Due"],
];

// Fictional sample documents
const samples = [
  {
    id: "irs",
    label: "IRS Notice",
    valid: true,
    preview: `FICTIONAL EXAMPLE — NOT A REAL TAX NOTICE

Internal Revenue Service
Notice: CP14
Account: Alex Example
Tax period: 2025
Issue date: 08/01/2026
Payment due date: 08/31/2026

Tax due: $500.00
Interest: $25.00
Penalty: $50.00
Total due: $575.00`,
    values: {
      fileName: "sample_irs_notice.txt",
      accountName: "Alex Example",
      entityType: "Individual",
      entityId: "***-**-1234",
      noticeId: "CP14",
      jurisdiction: "Federal (IRS)",
      stateId: "—",
      category: "Balance Due",
      taxPeriod: "2025",
      issuanceDate: "08/01/2026",
      context: "Fictional example of an unpaid federal tax balance.",
      dueDate: "08/31/2026",
      taxDue: "$500.00",
      interest: "$25.00",
      penalty: "$50.00",
      other: "$0.00",
      payments: "$0.00",
      preCredit: "$0.00",
      postCredit: "$0.00",
      totalDue: "$575.00",
    },
  },
  {
    id: "state",
    label: "State Tax Notice",
    valid: true,
    preview: `FICTIONAL EXAMPLE — NOT A REAL TAX NOTICE

New York State Department of Taxation and Finance
Notice number: NY-EXAMPLE-001
Account: Jordan Example
Tax period: 2025
Issue date: 09/01/2026
Payment due date: 10/01/2026

Tax due: $240.00
Interest: $8.00
Penalty: $12.00
Credit (pre-notice): $10.00
Total due: $250.00`,
    values: {
      fileName: "sample_state_notice.txt",
      accountName: "Jordan Example",
      entityType: "Individual",
      entityId: "***-**-5678",
      noticeId: "NY-EXAMPLE-001",
      jurisdiction: "New York",
      stateId: "—",
      category: "Balance Due",
      taxPeriod: "2025",
      issuanceDate: "09/01/2026",
      context: "Fictional example of an unpaid state tax balance.",
      dueDate: "10/01/2026",
      taxDue: "$240.00",
      interest: "$8.00",
      penalty: "$12.00",
      other: "$0.00",
      payments: "$0.00",
      preCredit: "$10.00",
      postCredit: "$0.00",
      totalDue: "$250.00",
    },
  },
  {
    id: "invalid",
    label: "Not a Tax Notice",
    valid: false,
    preview: `FICTIONAL EXAMPLE

Schedule L
Balance Sheets per Books

Beginning-of-year assets
End-of-year assets
Liabilities and equity

This is an example of a tax form schedule,
not a notice requesting a response or payment.`,
    values: null,
  },
];

// Simple extraction helpers for uploaded documents
function findMoney(text, labels) {
  for (const label of labels) {
    const pattern = new RegExp(
      `\\b${label}\\b\\s*[:\\-]?\\s*\\$?([\\d,]+(?:\\.\\d{2})?)`,
      "i",
    );

    const match = text.match(pattern);

    if (match) {
      const amount = Number(match[1].replaceAll(",", ""));

      if (Number.isFinite(amount)) {
        return `$${amount.toFixed(2)}`;
      }
    }
  }

  return "—";
}

function findDate(text, labels) {
  const datePattern = "(\\d{1,2}/\\d{1,2}/\\d{4}|\\d{4}-\\d{2}-\\d{2})";

  for (const label of labels) {
    const pattern = new RegExp(
      `\\b${label}\\b\\s*[:\\-]?\\s*${datePattern}`,
      "i",
    );

    const match = text.match(pattern);

    if (match) {
      return match[1];
    }
  }

  return "—";
}

function findField(text, labels) {
  for (const label of labels) {
    const pattern = new RegExp(`\\b${label}\\b\\s*[:\\-]\\s*([^\\n\\r]+)`, "i");

    const match = text.match(pattern);

    if (match) {
      return match[1].trim().slice(0, 100);
    }
  }

  return "—";
}

// Browser-based demonstration of notice identification
function analyzeDocument(text, fileName) {
  const cleanText = text.replace(/\s+/g, " ").trim();

  const hasIssuer =
    /\bIRS\b|internal revenue service|department of revenue|department of taxation/i.test(
      cleanText,
    );

  // Look for an identifiable notice code or notice heading.
  const hasNoticeMarker =
    /\b(?:CP|LT)\d{2,4}\b/i.test(cleanText) ||
    /\bnotice(?:\s+(?:number|no\.?|id))?\s*[:#]\s*[A-Z0-9-]{2,}/i.test(
      cleanText,
    ) ||
    /\bnotice\s+(?:number|no\.?|id)\s+[A-Z0-9-]{3,}/i.test(cleanText) ||
    /\b(?:notice of assessment|balance due notice|tax notice)\b/i.test(
      cleanText,
    );

  // Look for a payment or response requirement.
  const hasAction =
    /\b(?:payment|response)\s+due\s+date\b/i.test(cleanText) ||
    /\b(?:total|amount|balance|tax)\s+due\b/i.test(cleanText) ||
    /\brespond by\b/i.test(cleanText);

  const possibleNotice = hasIssuer && hasNoticeMarker && hasAction;

  const noticeId =
    cleanText.match(/\b(?:CP|LT)\d{2,3}\b/i)?.[0] ||
    findField(text, ["notice number", "notice id"]);

  let jurisdiction = "—";

  if (/\bIRS\b|internal revenue service/i.test(cleanText)) {
    jurisdiction = "Federal (IRS)";
  } else if (/new york/i.test(cleanText)) {
    jurisdiction = "New York";
  } else if (hasIssuer) {
    jurisdiction = "State (unspecified)";
  }

  const values = {
    fileName,
    accountName: findField(text, ["account name", "taxpayer name", "account"]),
    entityType: "—",
    entityId: "—",
    noticeId,
    jurisdiction,
    stateId: "—",

    category:
      /\bCP14\b|\bbalance due\b|\bunpaid (?:tax )?balance\b/i.test(cleanText) ||
      (/\bnotice (?:number|no\.?|id)\s*[:#]?\s*[A-Z0-9-]{3,}/i.test(
        cleanText,
      ) &&
        /\btotal due\b/i.test(cleanText))
        ? "Possible Balance Due Notice"
        : "—",
    taxPeriod: cleanText.match(/\btax period\s*[:-]?\s*(20\d{2})/i)?.[1] || "—",
    issuanceDate: findDate(cleanText, [
      "issuance date",
      "issue date",
      "notice date",
    ]),
    context: "Automated text extraction demo.",
    dueDate: findDate(cleanText, [
      "payment due date",
      "response due date",
      "due date",
    ]),
    taxDue: findMoney(cleanText, ["tax due"]),
    interest: findMoney(cleanText, ["interest"]),
    penalty: findMoney(cleanText, ["penalty"]),
    other: findMoney(cleanText, ["other charges"]),
    payments: findMoney(cleanText, ["payments made"]),
    preCredit: findMoney(cleanText, ["credit pre-notice"]),
    postCredit: findMoney(cleanText, ["credit post-notice"]),
    totalDue: findMoney(cleanText, [
      "total amount due",
      "total due",
      "amount due",
    ]),
  };

  return {
    valid: possibleNotice,
    uploaded: true,
    preview: text.slice(0, 1500),
    values,
  };
}

// Extract selectable text from a PDF locally

async function readPdf(file) {
  const data = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjsLib.getDocument({ data });

  try {
    const pdf = await loadingTask.promise;
    const pages = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      const lines = [];
      let currentLine = "";
      let lastY = null;

      for (const item of content.items) {
        if (typeof item.str !== "string") continue;

        const y = item.transform?.[5];

        // Start a new line when the vertical position changes.
        if (
          currentLine &&
          typeof y === "number" &&
          lastY !== null &&
          Math.abs(y - lastY) > 2
        ) {
          lines.push(currentLine.trim());
          currentLine = "";
        }

        if (currentLine && !currentLine.endsWith(" ")) {
          currentLine += " ";
        }

        currentLine += item.str;

        if (typeof y === "number") {
          lastY = y;
        }

        if (item.hasEOL) {
          if (currentLine.trim()) {
            lines.push(currentLine.trim());
          }

          currentLine = "";
          lastY = null;
        }
      }

      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      }

      pages.push(lines.join("\n"));
    }

    const text = pages.join("\n\n");

    if (!text.trim()) {
      throw new Error(
        "No selectable text was found. Scanned PDFs are not supported by this demo.",
      );
    }

    return text;
  } finally {
    await loadingTask.destroy();
  }
}

function TaxAssistant() {
  const [mode, setMode] = useState("sample");
  const [selectedSample, setSelectedSample] = useState("irs");
  const [uploadResult, setUploadResult] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const result =
    mode === "sample"
      ? samples.find((sample) => sample.id === selectedSample)
      : uploadResult;

  async function handleFile(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setMessage("");
    setUploadResult(null);

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!["pdf", "txt"].includes(extension)) {
      setMessage("Please select a PDF or TXT file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("Please select a file smaller than 10 MB.");
      return;
    }

    setLoading(true);

    try {
      const text =
        extension === "pdf" ? await readPdf(file) : await file.text();

      if (!text.trim()) {
        throw new Error("The document contains no readable text.");
      }

      setUploadResult(analyzeDocument(text, file.name));
    } catch (error) {
      setMessage(error.message || "Unable to read this document.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="top" className="site case-site">
      {/* Navigation */}
      <Header />

      <main tabIndex={-1} id="main-content">
        <section className="section tax-page">
          {/* Introduction */}
          <div className="tax-hero">
            <p className="eyebrow">AI PROJECT</p>

            <h1>Tax Notice Assistant</h1>

            <p>
              Explore how the assistant identifies tax notices and organizes
              their information into a structured table.
            </p>

            <p>
              Select a fictional sample or upload a document to try the
              browser-based extraction demo.
            </p>

            <div className="tax-tags">
              <span>Document Processing</span>
              <span>Information Extraction</span>
              <span>Custom GPT</span>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="tax-demo">
            <p className="eyebrow">INTERACTIVE DEMO</p>

            <h2>Try the assistant</h2>
            <p className="tax-disclaimer">
              Fictional samples illustrate the workflow. Uploaded files use
              local pattern matching; the original Custom GPT is linked below.
            </p>

            <div className="tax-mode-buttons">
              <button
                type="button"
                className={mode === "sample" ? "active" : ""}
                aria-pressed={mode === "sample"}
                onClick={() => setMode("sample")}
              >
                Sample documents
              </button>

              <button
                type="button"
                className={mode === "upload" ? "active" : ""}
                aria-pressed={mode === "upload"}
                onClick={() => setMode("upload")}
              >
                Upload a document
              </button>
            </div>

            {/* Sample Selection */}
            {mode === "sample" ? (
              <div className="tax-sample-section">
                <h3>Select a sample document</h3>

                <div className="tax-sample-buttons">
                  {samples.map((sample) => (
                    <button
                      key={sample.id}
                      aria-pressed={selectedSample === sample.id}
                      type="button"
                      className={selectedSample === sample.id ? "active" : ""}
                      onClick={() => setSelectedSample(sample.id)}
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Document Upload */
              <div className="tax-upload-section">
                <h3>Upload a PDF or TXT file</h3>

                <p>
                  Files are processed locally in your browser and are not sent
                  to a server.
                </p>

                <p>
                  Please use a fictional or redacted document for this
                  demonstration.
                </p>

                <label htmlFor="tax-file">Choose a document</label>

                <input
                  id="tax-file"
                  type="file"
                  accept=".pdf,.txt,application/pdf,text/plain"
                  onChange={handleFile}
                />

                {loading && <p role="status">Reading document...</p>}

                {message && (
                  <p role="alert" className="tax-error">
                    {message}
                  </p>
                )}
              </div>
            )}

            {/* Results */}
            {result && (
              <div className="tax-results">
                <div className="tax-document-preview">
                  <h3>Document preview</h3>

                  <pre>{result.preview}</pre>
                </div>

                <div className="tax-analysis">
                  <h3>Analysis results</h3>

                  <div
                    className={
                      result.valid
                        ? "tax-status tax-status-valid"
                        : "tax-status tax-status-invalid"
                    }
                    role="status"
                  >
                    {result.uploaded
                      ? result.valid
                        ? "Possible tax notice detected"
                        : "Tax notice not identified"
                      : result.valid
                        ? "Valid fictional sample notice"
                        : "Not a tax notice"}
                  </div>

                  {result.uploaded && (
                    <p className="tax-disclaimer">
                      This is a browser-based pattern matching demonstration,
                      not a complete AI analysis. Results may be incomplete or
                      incorrect.
                    </p>
                  )}

                  {result.valid ? (
                    <div className="tax-results-table">
                      {fields.map(([key, label]) => (
                        <div
                          key={key}
                          className={
                            key === "totalDue"
                              ? "tax-field tax-total"
                              : "tax-field"
                          }
                        >
                          <span>{label}</span>

                          <strong>{result.values?.[key] || "—"}</strong>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="tax-not-applicable">
                      {result.uploaded
                        ? "The demo could not identify this document as a tax notice. This does not confirm whether it is one."
                        : "This document is a tax form schedule rather than a tax notice, so field extraction is not applicable."}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Original Project */}
          <div className="tax-project-link">
            <h2>Explore the full project</h2>

            <p>
              This interactive demonstration shows the document validation and
              information extraction workflow. The original project uses a
              Custom GPT for more advanced document analysis.
            </p>

            <div className="tax-project-actions">
              <a
                href="https://chatgpt.com/g/g-681d917a12c481919b01e79e4f293857-tax-notice-assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="tax-gpt-button"
              >
                Try the Custom GPT ↗
              </a>

              <a
                href="https://github.com/chentenchi/tax-notice-assistant-gpt"
                target="_blank"
                rel="noopener noreferrer"
                className="tax-github-button"
              >
                View on GitHub ↗
              </a>
            </div>
          </div>
        </section>
      </main>
      <CaseFooter next="/grocery-price-tracker" title="Grocery Price Tracker" />
    </div>
  );
}

export default TaxAssistant;
