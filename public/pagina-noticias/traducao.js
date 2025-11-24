const translations = {
  pt: {
    // Header
    "header.inicio":"Início",
    "header.artigos.publicações":"Artigos e Publicações",
    "header.noticias":"Noticias",
    "header.membros":"Membros",
    "header.projetos":"Projetos",
    "header.sobre":"Sobre",
    "header.vagas":"Vagas",
    "header.fale.conosco":"Fale conosco",
    // Footer
    "footer.admin.acesso": "Acesso à área administrativa:",
    "footer.admin.botao": "Acesso",
    "footer.email.titulo": "Nosso E-mail:",
    "footer.redes.titulo": "Nossas redes sociais:",
    "footer.localizacao.titulo": "Nossa localização:",
    "footer.localizacao.texto": "Av. dos Astronautas, 1758, Jardim da Granja\nSão José dos Campos - SP",
    "footer.copyright": "Copyright © AgriRS ",
    // Página de Notícias
    "noticias.titulo_pagina": "AgriRS - Notícias",
    "noticias.titulo_principal": "Notícias",
    "noticias.filtro.categoria": "Categoria",
    "noticias.filtro.ano": "Ano",
    "noticias.filtro.placeholder_ano": "Digite um ano...",
    "noticias.filtro.aplicar": "Aplicar",
    "noticias.cat.curso": "Curso",
    "noticias.cat.defesa": "Defesa",
    "noticias.cat.informativo": "Informativo",
    "noticias.leia_mais": "Leia mais",
    // Mensagens do script.js
    "noticias.carregando": "Carregando notícias...",
    "noticias.erro": "❌ Erro ao carregar notícias. Verifique a conexão com o servidor."
  },
  en: {
    // Header
    "header.inicio":"Start",
    "header.artigos.publicações":"Articles and publications",
    "header.noticias":"News",
    "header.membros":"Members",
    "header.projetos":"Projects",
    "header.sobre":"About us",
    "header.vagas":"Vacancies",
    "header.fale.conosco":"Talk to us",
    // Footer
    "footer.admin.acesso": "Access to administrative area:",
    "footer.admin.botao": "Access",
    "footer.email.titulo": "Our E-mail:",
    "footer.redes.titulo": "Our social networks:",
    "footer.localizacao.titulo": "Our location:",
    "footer.localizacao.texto": "Av. dos Astronautas, 1758, Jardim da Granja\nSão José dos Campos - SP",
    "footer.copyright": "Copyright © AgriRS ",
    // News Page
    "noticias.titulo_pagina": "AgriRS - News",
    "noticias.titulo_principal": "News",
    "noticias.filtro.categoria": "Category",
    "noticias.filtro.ano": "Year",
    "noticias.filtro.placeholder_ano": "Enter a year...",
    "noticias.filtro.aplicar": "Apply",
    "noticias.cat.curso": "Course",
    "noticias.cat.defesa": "Defense",
    "noticias.cat.informativo": "Informative",
    "noticias.leia_mais": "Read more",
    // Messages from script.js
    "noticias.carregando": "Loading news...",
    "noticias.erro": "❌ Error loading news. Check the server connection."
  }
};

function setPageLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      const text = translations[lang][key];
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
  const saved = localStorage.getItem("lang") || "pt";
  setPageLanguage(saved);
}

document.addEventListener('headerLoaded', applyInitialTranslation);
document.addEventListener('footerLoaded', applyInitialTranslation);
window.addEventListener("DOMContentLoaded", applyInitialTranslation);