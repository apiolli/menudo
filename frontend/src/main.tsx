import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Menudo } from "./Menudo";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Menudo />
  </StrictMode>,
);
