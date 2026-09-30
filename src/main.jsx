import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PortfolioRouter from "./PortfolioRouter.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PortfolioRouter />
  </StrictMode>,
);
