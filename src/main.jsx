import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App";
import "./index.css";

function Main() {
  useEffect(() => {
    document.documentElement.classList.add("js-ready");
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
