function setLanguage(lang) {
  document.documentElement.lang = lang; // <html lang="pt">
  localStorage.setItem("lang", lang);

  // Chama a função global de tradução (que estará em traducao.js)
  if (typeof window.setPageLanguage === 'function') {
    window.setPageLanguage(lang);
  }
}

window.setLanguage = setLanguage;
 
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang");
  // A tradução inicial agora é controlada pelo script da página principal
  // e pelo menu-header.js, então podemos remover esta chamada para evitar redundância.
});
 