
"use strict";

/* ==========================================
   MIDAD GLOBAL HUB - SECURITY CORE
========================================== */

(() => {
  const SECURITY = {
    version: "1.0.0",
    initialized: false
  };

  // Secure default HTTP headers are configured by the hosting server.
  // This client-side layer provides basic input safeguards.

  function sanitizeText(value) {
    const element = document.createElement("div");
    element.textContent = String(value ?? "");
    return element.textContent;
  }

  function validateInput(value, maxLength = 500) {
    if (typeof value !== "string") return false;

    const text = value.trim();

    return (
      text.length > 0 &&
      text.length <= maxLength
    );
  }

  function initializeSecurity() {
    if (SECURITY.initialized) return;

    SECURITY.initialized = true;

    document.documentElement.dataset.security = "initialized";

    console.info("MIDAD Security Core initialized.");
  }

  window.MIDADSecurity = Object.freeze({
    version: SECURITY.version,
    sanitizeText,
    validateInput,
    initialize: initializeSecurity
  });

  initializeSecurity();
})();
