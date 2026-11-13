
"use strict";

/* MIDAD GLOBAL HUB - CORE SYSTEM */

const MIDAD = {
  name: "MIDAD Global Hub",
  version: "1.0.0",
  language: "ar",
  mode: "public",
  access: "both"
};

/* MULTI-LANGUAGE SYSTEM */

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

/* LANGUAGE MANAGEMENT */

function setLanguage(language) {
  if (!translations[language]) return;

  MIDAD.language = language;

  document.documentElement.lang = language;
  document.documentElement.dir =
    language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;

    if (translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });

  try {
    localStorage.setItem("midad-language", language);
  } catch (error) {
    console.warn("MIDAD language storage unavailable");
  }
}

/* NAVIGATION SYSTEM */

const MIDADNavigation = {
  currentPage: "home",

  navigate(page) {
    this.currentPage = page;

    document.querySelectorAll("[data-page]").forEach(section => {
      section.hidden = section.dataset.page !== page;
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
  }
};

/* NETWORK STATUS */

function initializeNetworkStatus() {
  const status = document.createElement("div");

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
  }

  document.body.appendChild(status);

  updateStatus();

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);
}

/* CORE INITIALIZATION */

function initializeMidad() {
  let savedLanguage = "ar";

  try {
    savedLanguage =
      localStorage.getItem("midad-language") || "ar";
  } catch (error) {
    console.warn("MIDAD storage unavailable");
  }

  setLanguage(savedLanguage);

  initializeNetworkStatus();

  console.info("MIDAD Global Hub initialized.");
}

/* NAVIGATION EVENTS */

document.addEventListener("click", event => {
  const button = event.target.closest("[data-nav]");

  if (!button) return;

  MIDADNavigation.navigate(button.dataset.nav);
});

/* PROTECTED ELEMENTS */

document.addEventListener("contextmenu", event => {
  if (event.target.closest("[data-protected]")) {
    event.preventDefault();
  }
});

/* GLOBAL ACCESS */

window.MIDAD = MIDAD;
window.MIDADNavigation = MIDADNavigation;
window.setMidadLanguage = setLanguage;

/* START */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeMidad,
    { once: true }
  );
} else {
  initializeMidad();
}
