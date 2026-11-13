
"use strict";

/* MIDAD GLOBAL HUB */

const MIDAD = {
  name: "MIDAD Global Hub",
  version: "1.0.0",
  language: "ar",
  mode: "public",
  access: "both"
};

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
    description: "Une plateforme mondiale pour la connaissance et la confidentialité",
    search: "Rechercher...",
    language: "Langue"
  }
};

function setLanguage(language) {
  if (!translations[language]) return;

  MIDAD.language = language;

  document.documentElement.lang = language;
  document.documentElement.dir =
    language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    const value = translations[language][key];

    if (value) element.textContent = value;
  });

  localStorage.setItem("midad-language", language);
}

function initializeMidad() {
  const savedLanguage =
    localStorage.getItem("midad-language") || "ar";

  setLanguage(savedLanguage);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./sw.js")
        .catch(error => {
          console.error("MIDAD Service Worker:", error);
        });
    });
  }

  console.log("MIDAD Global Hub initialized.");
}

document.addEventListener("DOMContentLoaded", initializeMidad);

window.MIDAD = MIDAD;
window.setMidadLanguage = setLanguage;
// MIDAD Global Hub - Core System
(() => {
  "use strict";

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

  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(status);
    updateStatus();
  });

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);

})();
