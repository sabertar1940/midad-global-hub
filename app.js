
"use strict";

/* =====================================
   MIDAD GLOBAL HUB - ADVANCED CORE
===================================== */

const MIDAD = {
  name: "MIDAD Global Hub",
  version: "2.0.0",
  language: "ar",
  mode: "public",
  access: "both",
  initialized: false
};

/* =====================================
   MULTI-LANGUAGE SYSTEM
===================================== */

const translations = {
  ar: {
    home: "الرئيسية",
    explore: "استكشف",
    community: "المجتمع",
    knowledge: "المعرفة",
    privacy: "الخصوصية",
    settings: "الإعدادات",
    welcome: "مرحباً بك في MIDAD",
    description: "منصة عالمية للمعرفة والمجتمع والخصوصية",
    search: "ابحث هنا...",
    language: "اللغة"
  },

  en: {
    home: "Home",
    explore: "Explore",
    community: "Community",
    knowledge: "Knowledge",
    privacy: "Privacy",
    settings: "Settings",
    welcome: "Welcome to MIDAD",
    description: "A global platform for knowledge, community and privacy",
    search: "Search here...",
    language: "Language"
  },

  fr: {
    home: "Accueil",
    explore: "Explorer",
    community: "Communauté",
    knowledge: "Connaissances",
    privacy: "Confidentialité",
    settings: "Paramètres",
    welcome: "Bienvenue sur MIDAD",
    description: "Une plateforme mondiale pour la connaissance, la communauté et la confidentialité",
    search: "Rechercher...",
    language: "Langue"
  }
};

/* =====================================
   LANGUAGE MANAGEMENT
===================================== */

function setLanguage(language) {
  if (!Object.prototype.hasOwnProperty.call(translations, language)) {
    return false;
  }

  MIDAD.language = language;

  document.documentElement.lang = language;
  document.documentElement.dir =
    language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    const translation = translations[language][key];

    if (translation !== undefined) {
      if (element.hasAttribute("placeholder")) {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });

  try {
    localStorage.setItem("midad-language", language);
  } catch (error) {
    console.warn("MIDAD: Language storage unavailable.");
  }

  return true;
}

/* =====================================
   NAVIGATION SYSTEM
===================================== */

const MIDADNavigation = {
  currentPage: "home",

  navigate(page) {
    if (!MIDADSecurity.validatePage(page)) {
      return false;
    }

    const target = document.querySelector(
      `[data-page="${page}"]`
    );

    if (!target) {
      console.warn("MIDAD: Page not found:", page);
      return false;
    }

    this.currentPage = page;

    document.querySelectorAll("[data-page]").forEach(section => {
      section.hidden = section !== target;
    });

    document.querySelectorAll("[data-nav]").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.nav === page
      );
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    return true;
  }
};

/* =====================================
   SECURITY CORE
===================================== */

const MIDADSecurity = {
  initialized: false,

  validatePage(page) {
    return typeof page === "string" &&
      /^[a-zA-Z0-9_-]+$/.test(page);
  },

  initialize() {
    if (this.initialized) return;

    this.initialized = true;

    console.info("MIDAD Security Core activated.");
  }
};

/* =====================================
   NETWORK STATUS
===================================== */

function initializeNetworkStatus() {
  let status = document.getElementById(
    "midad-network-status"
  );

  if (status) return;

  status = document.createElement("div");
  status.id = "midad-network-status";

  status.style.cssText = `
    position:fixed;
    bottom:12px;
    left:12px;
    padding:9px 15px;
    border-radius:10px;
    background:#111b2d;
    color:#16c7b5;
    font-size:13px;
    z-index:9999;
  `;

  function updateStatus() {
    status.textContent = navigator.onLine
      ? "MIDAD • Online"
      : "MIDAD • Offline";

    status.style.color = navigator.onLine
      ? "#16c7b5"
      : "#ffb454";
  }

  document.body.appendChild(status);

  updateStatus();

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);
}

/* =====================================
   PROTECTED ELEMENTS
===================================== */

function initializeProtectedElements() {
  document.addEventListener("contextmenu", event => {
    if (event.target.closest("[data-protected]")) {
      event.preventDefault();
    }
  });
}

/* =====================================
   NAVIGATION EVENTS
===================================== */

function initializeNavigation() {
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-nav]");

    if (!button) return;

    event.preventDefault();

    MIDADNavigation.navigate(button.dataset.nav);
  });
}

/* =====================================
   LANGUAGE SELECTORS
===================================== */

function initializeLanguageSelectors() {
  const selectors = [
    document.getElementById("language-selector"),
    document.getElementById("settings-language")
  ];

  selectors.forEach(selector => {
    if (!selector) return;

    selector.value = MIDAD.language;

    selector.addEventListener("change", () => {
      if (setLanguage(selector.value)) {
        selectors.forEach(other => {
          if (other) other.value = MIDAD.language;
        });
      }
    });
  });
}

/* =====================================
   SERVICE WORKER
===================================== */

function initializeServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  if (
    location.protocol !== "https:" &&
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1"
  ) {
    return;
  }

  navigator.serviceWorker.register("./service-worker.js")
    .then(() => {
      console.info("MIDAD: Offline service activated.");
    })
    .catch(error => {
      console.error("MIDAD Service Worker:", error);
    });
}

/* =====================================
   CORE INITIALIZATION
===================================== */

function initializeMidad() {
  if (MIDAD.initialized) return;

  MIDAD.initialized = true;

  let savedLanguage = "ar";

  try {
    savedLanguage =
      localStorage.getItem("midad-language") || "ar";
  } catch (error) {
    console.warn("MIDAD: Storage unavailable.");
  }

  if (!setLanguage(savedLanguage)) {
    setLanguage("ar");
  }

  MIDADSecurity.initialize();

  initializeNetworkStatus();
  initializeNavigation();
  initializeProtectedElements();
  initializeLanguageSelectors();
  initializeServiceWorker();

  MIDADNavigation.navigate("home");

  console.info(
    "MIDAD Global Hub v" +
    MIDAD.version +
    " initialized successfully."
  );
}

/* =====================================
   GLOBAL ACCESS
===================================== */

window.MIDAD = MIDAD;
window.MIDADNavigation = MIDADNavigation;
window.MIDADSecurity = MIDADSecurity;
window.setMidadLanguage = setLanguage;

/* =====================================
   START SYSTEM
===================================== */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeMidad,
    { once: true }
  );
} else {
  initializeMidad();
}
