const translations = {
  pt: {
    "header.inicio":"Início",
    "header.artigos.publicações":"Artigos e Publicações",
    "header.noticias":"Noticias",
    "header.membros":"Membros",
    "header.projetos":"Projetos",
    "header.sobre":"Sobre",
    "header.vagas":"Vagas",
    "header.fale.conosco":"Fale conosco",
  },
    
  en: {
    "header.inicio":"Start",
    "header.artigos.publicações":"Articles and publications",
    "header.noticias":"News",
    "header.membros":"Members",
    "header.projetos":"Projects",
    "header.sobre":"About us",
    "header.vagas":"Vacancies",
    "header.fale.conosco":"Talk to us",
 
  } 
};
 
let currentLang = "pt";
 
function setLanguage(lang) {
console.log('foi', lang)
  currentLang = lang;
  document.documentElement.lang = lang; // <html lang="pt">
  document
    .querySelectorAll("[data-i18n]")
    .forEach(el => {
      const key = el.getAttribute("data-i18n");
      const text = translations[lang][key];
      if (text) el.textContent = text;
    });
  localStorage.setItem("lang", lang);
}

window.setLanguage = setLanguage;
 
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang");
  setLanguage(saved || "pt");
});
 