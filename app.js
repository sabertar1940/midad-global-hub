
/* =====================================
   MIDAD GLOBAL HUB
   Main Application - Version 1.1
   ===================================== */

"use strict";

const MIDAD = {
  name: "MIDAD Global Hub",
  version: "1.1.0",

  languages: {
    ar: { name: "العربية", dir: "rtl" },
    fr: { name: "Français", dir: "ltr" },
    en: { name: "English", dir: "ltr" },
    es: { name: "Español", dir: "ltr" },
    pt: { name: "Português", dir: "ltr" },
    de: { name: "Deutsch", dir: "ltr" },
    it: { name: "Italiano", dir: "ltr" },
    tr: { name: "Türkçe", dir: "ltr" },
    ru: { name: "Русский", dir: "ltr" },
    zh: { name: "中文", dir: "ltr" },
    hi: { name: "हिन्दी", dir: "ltr" },
    ur: { name: "اردو", dir: "rtl" },
    ja: { name: "日本語", dir: "ltr" }
  },

  translations: {
    ar: {
      about: "عن مِداد",
      spaces: "المساحات",
      privacy: "الخصوصية",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      explore: "اكتشف مِداد",
      welcome: "أفكارك تستحق مساحة أوسع",
      description: "منصة عالمية للمعرفة والحوار والمشاركة، تجمع بين الابتكار والخصوصية."
    },
    en: {
      about: "About MIDAD",
      spaces: "Spaces",
      privacy: "Privacy",
      login: "Login",
      register: "Create account",
      explore: "Explore MIDAD",
      welcome: "Your ideas deserve a wider space",
      description: "A global platform for knowledge, discussion and sharing, built around innovation and privacy."
    },
    fr: {
      about: "À propos",
      spaces: "Espaces",
      privacy: "Confidentialité",
      login: "Connexion",
      register: "Créer un compte",
      explore: "Découvrir MIDAD",
      welcome: "Vos idées méritent plus d'espace",
      description: "Une plateforme mondiale de connaissance, de dialogue et de partage."
    },
    es: {
      about: "Acerca de MIDAD",
      spaces: "Espacios",
      privacy: "Privacidad",
      login: "Iniciar sesión",
      register: "Crear cuenta",
      explore: "Descubrir MIDAD",
      welcome: "Tus ideas merecen más espacio",
      description: "Una plataforma global de conocimiento, diálogo y colaboración."
    },
    pt: {
      about: "Sobre MIDAD",
      spaces: "Espaços",
      privacy: "Privacidade",
      login: "Entrar",
      register: "Criar conta",
      explore: "Explorar MIDAD",
      welcome: "As suas ideias merecem mais espaço",
      description: "Uma plataforma global de conhecimento e partilha."
    },
    de: {
      about: "Über MIDAD",
      spaces: "Bereiche",
      privacy: "Datenschutz",
      login: "Anmelden",
      register: "Konto erstellen",
      explore: "MIDAD entdecken",
      welcome: "Deine Ideen verdienen mehr Raum",
      description: "Eine globale Plattform für Wissen und Austausch."
    },
    it: {
      about: "Informazioni",
      spaces: "Spazi",
      privacy: "Privacy",
      login: "Accedi",
      register: "Crea account",
      explore: "Esplora MIDAD",
      welcome: "Le tue idee meritano più spazio",
      description: "Una piattaforma globale di conoscenza e condivisione."
    },
    tr: {
      about: "Hakkımızda",
      spaces: "Alanlar",
      privacy: "Gizlilik",
      login: "Giriş",
      register: "Hesap oluştur",
      explore: "MIDAD'ı keşfet",
      welcome: "Fikirlerin daha geniş bir alanı hak ediyor",
      description: "Bilgi ve paylaşım için küresel bir platform."
    },
    ru: {
      about: "О платформе",
      spaces: "Пространства",
      privacy: "Конфиденциальность",
      login: "Войти",
      register: "Создать аккаунт",
      explore: "Открыть MIDAD",
      welcome: "Ваши идеи заслуживают большего пространства",
      description: "Глобальная платформа знаний и общения."
    },
    zh: {
      about: "关于我们",
      spaces: "空间",
      privacy: "隐私",
      login: "登录",
      register: "创建账户",
      explore: "探索 MIDAD",
      welcome: "让你的想法拥有更广阔的空间",
      description: "一个全球知识交流与分享平台。"
    },
    hi: {
      about: "हमारे बारे में",
      spaces: "स्थान",
      privacy: "गोपनीयता",
      login: "लॉगिन",
      register: "खाता बनाएं",
      explore: "MIDAD देखें",
      welcome: "आपके विचार बड़े मंच के हकदार हैं",
      description: "ज्ञान और संवाद के लिए एक वैश्विक मंच।"
    },
    ur: {
      about: "تعارف",
      spaces: "مقامات",
      privacy: "رازداری",
      login: "لاگ ان",
      register: "اکاؤنٹ بنائیں",
      explore: "MIDAD دریافت کریں",
      welcome: "آپ کے خیالات وسیع جگہ کے مستحق ہیں",
      description: "علم اور مکالمے کے لیے ایک عالمی پلیٹ فارم۔"
    },
    ja: {
      about: "MIDADについて",
      spaces: "スペース",
      privacy: "プライバシー",
      login: "ログイン",
      register: "アカウント作成",
      explore: "MIDADを探す",
      welcome: "あなたのアイデアにもっと広い場所を",
      description: "知識と交流のためのグローバルプラットフォーム。"
    }
  },

  init() {
    this.setupLanguage();
    this.setupNavigation();
    this.setupSmoothScrolling();
    this.setupYear();
    this.setupInteractions();

    console.log("MIDAD Global Hub initialized.");
  },

  setupLanguage() {
    const selector = document.getElementById("language");

    if (!selector) return;

    selector.addEventListener("change", () => {
      this.changeLanguage(selector.value);
    });
  },

  changeLanguage(language) {
    const config = this.languages[language];
    const dictionary = this.translations[language];

    if (!config || !dictionary) return;

    document.documentElement.lang = language;
    document.documentElement.dir = config.dir;

    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.dataset.i18n;

      if (dictionary[key]) {
        element.textContent = dictionary[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
      const key = element.dataset.i18nPlaceholder;

      if (dictionary[key]) {
        element.placeholder = dictionary[key];
      }
    });

    try {
      localStorage.setItem("midad-language", language);
    } catch (error) {
      console.warn("Language preference could not be saved.");
    }
  },

  setupNavigation() {
    document.querySelectorAll(".nav-links a, .actions a").forEach(link => {
      link.addEventListener("click", () => {
        document.querySelectorAll(".nav-links a").forEach(item => {
          item.classList.remove("active");
        });

        if (link.closest(".nav-links")) {
          link.classList.add("active");
        }
      });
    });
  },

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", event => {
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    });
  },

  setupYear() {
    const year = document.querySelector("[data-year]");

    if (year) {
      year.textContent = new Date().getFullYear();
    }
  },

  setupInteractions() {
    document.querySelectorAll("[data-midad-action]").forEach(button => {
      button.addEventListener("click", () => {
        const action = button.dataset.midadAction;

        if (action === "login" || action === "register") {
          alert("MIDAD: Secure account services are not yet activated.");
        }
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  MIDAD.init();

  try {
    const savedLanguage = localStorage.getItem("midad-language");
    const selector = document.getElementById("language");

    if (savedLanguage && MIDAD.languages[savedLanguage] && selector) {
      selector.value = savedLanguage;
      MIDAD.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.warn("Local preferences unavailable.");
  }
});

