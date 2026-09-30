import { lazy, Suspense, useLayoutEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Header, Footer } from "./SiteLayout.jsx";
import "./CaseStudies.css";

const Experience = lazy(() => import("./Experience.jsx"));
const ClashRoyale = lazy(() => import("./ClashRoyale.jsx"));
const GroceryTracker = lazy(() => import("./GroceryTracker.jsx"));
const TaxAssistant = lazy(() => import("./TaxAssistant.jsx"));
const UrbanForest = lazy(() => import("./UrbanForest.jsx"));
const ImageViewer = lazy(() => import("./ImageViewer.jsx"));

const titles = {
  "/": "Tenchi Chen | Data & Business Analytics",
  "/experience": "Experience | Tenchi Chen",
  "/clash-royale": "Clash Royale ML Pipeline | Tenchi Chen",
  "/grocery-price-tracker": "Grocery Price Tracker | Tenchi Chen",
  "/tax-assistant": "Tax Notice Assistant | Tenchi Chen",
  "/urban-forest": "Mapping NYC’s Urban Forest | Tenchi Chen",
  "/view/tree-map": "NYC Tree Map | Tenchi Chen",
  "/view/roc-curve": "ROC Curve | Tenchi Chen",
};

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    document.title = titles[pathname] || "Page not found | Tenchi Chen";
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [pathname, hash]);
  return null;
}

function Loading() {
  return (
    <div id="top" className="site">
      <Header />
      <main
        tabIndex={-1}
        id="main-content"
        className="page-loading"
        role="status"
      >
        Loading project…
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div id="top" className="site">
      <Header />
      <main tabIndex={-1} id="main-content" className="page-loading">
        <p className="eyebrow">404 / PAGE NOT FOUND</p>
        <h1>This path ends here.</h1>
        <p>The work is still worth exploring.</p>
        <Link className="primary-button" to="/">
          Back to the portfolio
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default function PortfolioRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/clash-royale" element={<ClashRoyale />} />
          <Route path="/grocery-price-tracker" element={<GroceryTracker />} />
          <Route path="/tax-assistant" element={<TaxAssistant />} />
          <Route path="/urban-forest" element={<UrbanForest />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/view/:imageId" element={<ImageViewer />} />
        </Routes>
        <RouteEffects />
      </Suspense>
    </BrowserRouter>
  );
}
