const translations = {
  pt: {
    // Header
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
    // Página de Notícias
    "noticias.titulo_pagina": "AgriRS - Notícias",
    "noticias.titulo_principal": "Notícias",
    "noticias.descricao": "Fique por dentro das últimas novidades, eventos e descobertas do AgriRSLab.",
    "noticias.filtro.todas": "Todas",
    "noticias.filtro.curso": "Curso",
    "noticias.filtro.defesa": "Defesa",
    "noticias.filtro.informativo": "Informativo",
    "noticias.ler_mais": "Ler mais",
    "noticias.nenhuma_encontrada": "Nenhuma notícia encontrada para este filtro.",
    // Mensagens do script.js
    "noticias.carregando": "Carregando notícias...",
    "noticias.erro": "❌ Erro ao carregar notícias. Verifique a conexão com o servidor."
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
    // News Page
    "noticias.titulo_pagina": "AgriRS - News",
    "noticias.titulo_principal": "News",
    "noticias.descricao": "Stay up to date with the latest news, events, and discoveries from AgriRSLab.",
    "noticias.filtro.todas": "All",
    "noticias.filtro.curso": "Course",
    "noticias.filtro.defesa": "Defense",
    "noticias.filtro.informativo": "Informative",
    "noticias.ler_mais": "Read more",
    "noticias.nenhuma_encontrada": "No news found for this filter.",
    // Messages from script.js
    "noticias.carregando": "Loading news...",
    "noticias.erro": "❌ Error loading news. Check the server connection."
  }
};

// A lógica de tradução será gerenciada pelo script global da página
function setPageLanguage(lang) { document.querySelectorAll("[data-i18n]").forEach(el => { const key = el.getAttribute("data-i18n"); if (translations[lang] && translations[lang][key]) { const text = translations[lang][key]; if (key === 'footer.copyright' && el.querySelector('#ano')) { el.firstChild.textContent = text; } else { el.textContent = text; } } }); document.querySelectorAll("[data-i18n-placeholder]").forEach(el => { const key = el.getAttribute("data-i18n-placeholder"); if (translations[lang] && translations[lang][key]) el.placeholder = translations[lang][key]; }); }
window.setPageLanguage = setPageLanguage;
function applyInitialTranslation() { const saved = localStorage.getItem("lang") || "pt"; setPageLanguage(saved); }
document.addEventListener('headerLoaded', applyInitialTranslation);
document.addEventListener('footerLoaded', applyInitialTranslation);
window.addEventListener("DOMContentLoaded", applyInitialTranslation);