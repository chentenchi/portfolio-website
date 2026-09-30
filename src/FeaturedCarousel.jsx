import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Arrow } from "./SiteLayout.jsx";
import "./FeaturedCarousel.css";
import ProjectVisual from "./ProjectVisual.jsx";

const slides = [
  {
    title: "Seeing the city through its trees.",
    name: "Mapping NYC’s Urban Forest",
    image: "forest-nyc-trees.png",
    alt: "NYC street-tree locations plotted over City Council districts",
    path: "/urban-forest",
    category: "Geospatial analysis",
    tools: "R · sf · Leaflet",
    label: "NEW YORK CITY",
    map: true,
  },
  {
    title: "The price of an everyday basket.",
    name: "Grocery Price Tracker",
    visual: "grocery",
    alt: "Tableau dashboard comparing grocery prices with national BLS benchmarks",
    path: "/grocery-price-tracker",
    category: "Interactive analytics",
    tools: "Python · Tableau",
    label: "GROCERY PRICES",
  },
  {
    title: "Finding patterns before the battle.",
    name: "Clash Royale ML Pipeline",
    visual: "clash",
    alt: "ROC curve from the Clash Royale logistic regression model",
    path: "/clash-royale",
    category: "Machine learning",
    tools: "PySpark · Google Cloud",
    label: "MODEL EVALUATION",
  },
  {
    title: "From a notice to something useful.",
    name: "Tax Notice Assistant",
    visual: "tax",
    alt: "Fictional tax notice and its structured extraction results",
    path: "/tax-assistant",
    category: "Document extraction",
    tools: "Custom GPT · Applied AI",
    label: "FICTIONAL SAMPLE",
  },
];

export default function FeaturedCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [linkFocused, setLinkFocused] = useState(false);
  const [visible, setVisible] = useState(() => !document.hidden);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const rotating = !paused && !hovered && !linkFocused && visible && !reducedMotion;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % slides.length),
      6500,
    );
    return () => window.clearTimeout(timer);
  }, [rotating, active]);

  function select(index) {
    setActive((index + slides.length) % slides.length);
  }

  return (
    <section
      className="featured-carousel hero-study"
      aria-label="Featured projects"
      aria-roledescription="carousel"
    >
      <div
        className="carousel-stage"
        aria-live={rotating ? "off" : "polite"}
        aria-atomic="true"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.path}
            className={`carousel-slide${index === active ? " is-active" : ""}`}
            aria-hidden={index !== active}
            inert={index !== active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.name}`}
          >
            <Link
              className="featured-slide"
              to={slide.path}
              aria-label={`Explore ${slide.name}`}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocus={() => setLinkFocused(true)}
              onBlur={() => setLinkFocused(false)}
            >
              <div className="study-top">
                <span>FIELD NOTES</span>
                <span>
                  {slide.label} <span aria-hidden="true">↗</span>
                </span>
              </div>
              <div
                className={slide.map ? "hero-map" : "hero-map featured-visual"}
              >
                {slide.map ? (
                  <>
                    <img
                      src={`/images/${slide.image}`}
                      alt={slide.alt}
                      fetchPriority="high"
                    />
                    <span className="map-coordinate">
                      40.7128° N / 74.0060° W
                    </span>
                  </>
                ) : (
                  <ProjectVisual id={slide.visual} />
                )}
              </div>
              <div className="study-caption">
                <div>
                  <span className="micro-label">FEATURED PROJECT</span>
                  <h2>{slide.title}</h2>
                </div>
                <span className="circle-arrow">
                  <Arrow />
                </span>
              </div>
              <div className="study-bottom">
                <span>{slide.category}</span>
                <span>{slide.tools}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <div
          className="carousel-dots"
          role="group"
          aria-label="Choose featured project"
        >
          {slides.map((slide, index) => (
            <button
              key={slide.path}
              type="button"
              aria-label={`Show ${slide.name}`}
              aria-pressed={active === index}
              onClick={() => select(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="carousel-actions">
          {!reducedMotion && (
            <button
              type="button"
              className="carousel-rotation"
              aria-label={
                paused ? "Start automatic rotation" : "Pause automatic rotation"
              }
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? "Play" : "Pause"}
            </button>
          )}
          <button
            type="button"
            aria-label="Previous featured project"
            onClick={() => select(active - 1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next featured project"
            onClick={() => select(active + 1)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
