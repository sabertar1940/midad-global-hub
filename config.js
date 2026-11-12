
const MIDAD_CONFIG = {
  name: "MIDAD Global Hub",
  shortName: "MIDAD",
  version: "1.0.0",

  language: "ar",
  direction: "rtl",

  accessMode: "both",
  networkMode: "onion",
  visibility: "public",

  features: {
    multilingual: true,
    offlineSupport: true,
    privacyProtection: true,
    secureNavigation: true,
    responsiveDesign: true
  },

  languages: [
    "ar",
    "en",
    "fr",
    "es",
    "de",
    "it",
    "pt",
    "tr",
    "ru",
    "zh",
    "ja",
    "ko"
  ]
};

if (typeof module !== "undefined") {
  module.exports = MIDAD_CONFIG;
}
