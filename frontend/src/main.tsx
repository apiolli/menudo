import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Menudo } from "./Menudo";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Menudo />
  </StrictMode>,
);
