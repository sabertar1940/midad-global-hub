
"use strict";

/* ==========================================
   MIDAD GLOBAL HUB - ADVANCED APPLICATION
   VERSION 2.0
========================================== */

(() => {

  const MIDAD = {
    name: "MIDAD Global Hub",
    version: "2.0.0",
    language: "ar",
    mode: "public",
    access: "both",
    initialized: false
  };

  /* ==========================================
     MULTI-LANGUAGE SYSTEM
  ========================================== */

  const translations = {

    ar: {
      home: "الرئيسية",
      explore: "استكشف",
      community: "المجتمع",
      knowledge: "المعرفة",
      privacy: "الخصوصية",
      about: "من نحن",
      contact: "اتصل بنا",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      logout: "تسجيل الخروج",
      search: "بحث",
      settings: "الإعدادات",
      profile: "الملف الشخصي",
      language: "اللغة",
      welcome: "مرحباً بك في MIDAD",
      subtitle: "منصة عالمية للمعرفة والتواصل والإبداع",
      discover: "اكتشف عالماً جديداً من الإمكانيات",
      start: "ابدأ الآن",
      services: "خدماتنا",
      loading: "جاري التحميل...",
      error: "حدث خطأ، حاول مرة أخرى",
      success: "تمت العملية بنجاح",
      footer: "جميع الحقوق محفوظة لـ MIDAD Global Hub"
    },

    fr: {
      home: "Accueil",
      explore: "Explorer",
      community: "Communauté",
      knowledge: "Connaissances",
      privacy: "Confidentialité",
      about: "À propos",
      contact: "Contact",
      login: "Connexion",
      register: "Créer un compte",
      logout: "Déconnexion",
      search: "Rechercher",
      settings: "Paramètres",
      profile: "Profil",
      language: "Langue",
      welcome: "Bienvenue sur MIDAD",
      subtitle: "Une plateforme mondiale de connaissance et de créativité",
      discover: "Découvrez un monde de nouvelles possibilités",
      start: "Commencer",
      services: "Nos services",
      loading: "Chargement...",
      error: "Une erreur est survenue",
      success: "Opération réussie",
      footer: "Tous droits réservés à MIDAD Global Hub"
    },

    en: {
      home: "Home",
      explore: "Explore",
      community: "Community",
      knowledge: "Knowledge",
      privacy: "Privacy",
      about: "About Us",
      contact: "Contact",
      login: "Login",
      register: "Create Account",
      logout: "Logout",
      search: "Search",
      settings: "Settings",
      profile: "Profile",
      language: "Language",
      welcome: "Welcome to MIDAD",
      subtitle: "A global platform for knowledge, communication and creativity",
      discover: "Discover a world of new possibilities",
      start: "Get Started",
      services: "Our Services",
      loading: "Loading...",
      error: "An error occurred. Please try again",
      success: "Operation completed successfully",
      footer: "All rights reserved to MIDAD Global Hub"
    }

  };

  /* ==========================================
     LANGUAGE MANAGEMENT
  ========================================== */

  function getSavedLanguage() {
    try {
      const saved = localStorage.getItem("midad-language");

      return translations[saved] ? saved : "ar";

    } catch (error) {
      return "ar";
    }
  }

  function setLanguage(language) {

    if (!translations[language]) return false;

    MIDAD.language = language;

    const isArabic = language === "ar";

    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    document.body.dir = isArabic ? "rtl" : "ltr";

    try {
      localStorage.setItem("midad-language", language);
    } catch (error) {
      console.warn("MIDAD: Language preference could not be saved.");
    }

    updateTranslations();

    document.dispatchEvent(
      new CustomEvent("midad:languageChanged", {
        detail: { language }
      })
    );

    return true;
  }

  /* ==========================================
     TRANSLATION ENGINE
  ========================================== */

  function updateTranslations() {

    const dictionary = translations[MIDAD.language];

    document.querySelectorAll("[data-i18n]").forEach((element) => {

      const key = element.getAttribute("data-i18n");

      if (dictionary[key] !== undefined) {
        element.textContent = dictionary[key];
      }

    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {

      const key = element.getAttribute("data-i18n-placeholder");

      if (dictionary[key] !== undefined) {
        element.setAttribute("placeholder", dictionary[key]);
      }

    });

    document.querySelectorAll("[data-i18n-title]").forEach((element) => {

      const key = element.getAttribute("data-i18n-title");

      if (dictionary[key] !== undefined) {
        element.setAttribute("title", dictionary[key]);
      }

    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {

      const key = element.getAttribute("data-i18n-aria");

      if (dictionary[key] !== undefined) {
        element.setAttribute("aria-label", dictionary[key]);
      }

    });

  }

  /* ==========================================
     LANGUAGE SELECTOR
  ========================================== */

  function initializeLanguageControls() {

    document.addEventListener("change", (event) => {

      if (
        event.target.matches(
          "[data-language-selector], #languageSelect"
        )
      ) {
        setLanguage(event.target.value);
      }

    });

    document.addEventListener("click", (event) => {

      const button = event.target.closest("[data-set-language]");

      if (button) {
        const language = button.getAttribute("data-set-language");
        setLanguage(language);
      }

    });

  }

  /* ==========================================
     PWA SERVICE WORKER
  ========================================== */

  async function registerServiceWorker() {

    if (!("serviceWorker" in navigator)) return;

    if (
      location.protocol !== "https:" &&
      location.hostname !== "localhost" &&
      location.hostname !== "127.0.0.1"
    ) {
      return;
    }

    try {

      await navigator.serviceWorker.register("./service-worker.js");

      console.info("MIDAD: Service Worker registered.");

    } catch (error) {

      console.error("MIDAD: Service Worker registration failed.", error);

    }

  }

  /* ==========================================
     APPLICATION INITIALIZATION
  ========================================== */

  async function initializeMidad() {

    if (MIDAD.initialized) return;

    MIDAD.initialized = true;

    setLanguage(getSavedLanguage());

    initializeLanguageControls();

    await registerServiceWorker();

    document.documentElement.dataset.midad = "initialized";

    document.dispatchEvent(
      new CustomEvent("midad:ready")
    );

    console.info("MIDAD Global Hub initialized.");

  }

  /* ==========================================
     PUBLIC APPLICATION API
  ========================================== */

  window.MIDAD = {

    name: MIDAD.name,

    version: MIDAD.version,

    get language() {
      return MIDAD.language;
    },

    setLanguage,

    getTranslations() {
      return { ...translations[MIDAD.language] };
    },

    getStatus() {
      return {
        initialized: MIDAD.initialized,
        language: MIDAD.language,
        version: MIDAD.version
      };
    }

  };

  /* ==========================================
     APPLICATION START
  ========================================== */

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initializeMidad,
      { once: true }
    );

  } else {

    initializeMidad();

  }

})();
