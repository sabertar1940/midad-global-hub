
"use strict";

const MIDAD_SECURITY = {
  version: "1.0.0",

  settings: {
    forceHTTPS: true,
    preventClickjacking: true,
    preventMimeSniffing: true,
    secureReferrer: true,
    limitPermissions: true
  },

  initialize() {
    if (location.protocol !== "https:" &&
        location.hostname !== "localhost") {
      console.warn("MIDAD: HTTPS is recommended.");
    }

    console.info("MIDAD Security initialized.");
  },

  validateInput(value, maxLength = 500) {
    if (typeof value !== "string") return false;

    return value.length <= maxLength;
  },

  sanitizeText(value) {
    if (typeof value !== "string") return "";

    const element = document.createElement("div");
    element.textContent = value;

    return element.innerHTML;
  },

  createSecureId() {
    if (crypto.randomUUID) {
      return crypto.randomUUID();
    }

    const bytes = crypto.getRandomValues(
      new Uint8Array(16)
    );

    return Array.from(bytes)
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  }
};

MIDAD_SECURITY.initialize();
