const translations = {
  pt: {
    // Header (copiado para garantir consistência)
    "header.inicio":"Início",
    "header.artigos.publicações":"Artigos e Publicações",
    "header.noticias":"Notícias",
    "header.membros":"Membros",
    "header.projetos":"Projetos",
    "header.sobre":"Sobre",
    "header.vagas":"Vagas",
    "header.fale.conosco":"Fale conosco",
    "header.pesquisar": "Pesquisar...",
    // Footer
    "footer.admin.acesso": "Acesso à área administrativa:",
    "footer.admin.botao": "Acesso",
    "footer.email.titulo": "Nosso E-mail:",
    "footer.redes.titulo": "Nossas redes sociais:",
    "footer.localizacao.titulo": "Nossa localização:",
    "footer.localizacao.texto": "Av. dos Astronautas, 1758, Jardim da Granja\nSão José dos Campos - SP",
    "footer.copyright": "Copyright © AgriRS ",
    // Página de Artigos
    "artigos.titulo_pagina": "AgriRS - Publicações",
    "artigos.titulo_principal": "Publicações",
    "artigos.filtro.tipo": "Tipo",
    "artigos.filtro.titulo_ano": "Título/Ano",
    "artigos.filtro.placeholder": "Digite um título ou ano...",
    "artigos.filtro.aplicar": "Aplicar",
    "artigos.cat.artigos": "Artigos",
    "artigos.cat.conferencia": "Artigos de Conferência (AC)",
    "artigos.cat.livros": "Capítulos de livros (CL)",
    "artigos.cat.notas": "Notas Técnicas (NT)",
    // Mensagens do script.js
    "artigos.carregando": "Carregando...",
    "artigos.erro": "❌ Erro ao carregar publicações. Verifique a conexão com o servidor."
  },
  en: {
    // Header
    "header.inicio":"Home",
    "header.artigos.publicações":"Articles and publications",
    "header.noticias":"News",
    "header.membros":"Members",
    "header.projetos":"Projects",
    "header.sobre":"About us",
    "header.vagas":"Vacancies",
    "header.fale.conosco":"Talk to us",
    "header.pesquisar": "Search...",
    // Footer
    "footer.admin.acesso": "Access to administrative area:",
    "footer.admin.botao": "Access",
    "footer.email.titulo": "Our E-mail:",
    "footer.redes.titulo": "Our social networks:",
    "footer.localizacao.titulo": "Our location:",
    "footer.localizacao.texto": "Av. dos Astronautas, 1758, Jardim da Granja\nSão José dos Campos - SP",
    "footer.copyright": "Copyright © AgriRS ",
    // Articles Page
    "artigos.titulo_pagina": "AgriRS - Publications",
    "artigos.titulo_principal": "Publications",
    "artigos.filtro.tipo": "Type",
    "artigos.filtro.titulo_ano": "Title/Year",
    "artigos.filtro.placeholder": "Enter a title or year...",
    "artigos.filtro.aplicar": "Apply",
    "artigos.cat.artigos": "Articles",
    "artigos.cat.conferencia": "Conference Papers (AC)",
    "artigos.cat.livros": "Book Chapters (CL)",
    "artigos.cat.notas": "Technical Notes (NT)",
    // Messages from script.js
    "artigos.carregando": "Loading...",
    "artigos.erro": "❌ Error loading publications. Check the server connection."
  }
};
 
let currentLang = "pt";
 
function setPageLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      const text = translations[lang][key];
      // Lógica especial para o copyright para não apagar o span do ano
      if (key === 'footer.copyright' && el.querySelector('#ano')) {
        el.firstChild.textContent = text;
      } else {
        el.textContent = text;
      }
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}

window.setPageLanguage = setPageLanguage;

function applyInitialTranslation() {
  const saved = localStorage.getItem("lang");
  setPageLanguage(saved || "pt");
}

document.addEventListener('headerLoaded', applyInitialTranslation);
document.addEventListener('footerLoaded', applyInitialTranslation);
window.addEventListener("DOMContentLoaded", applyInitialTranslation);
 