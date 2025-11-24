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
    // Página de Projetos
    "projetos.titulo_pagina": "AgriRS - Projetos",
    "projetos.titulo_principal": "Projetos",
    "projetos.descricao": "Conheça os projetos desenvolvidos pelo AgriRSLab, desde pesquisas em andamento até trabalhos já concluídos que contribuem para o avanço do sensoriamento remoto na agricultura.",
    "projetos.filtro.todos": "Todos",
    "projetos.filtro.andamento": "Em Andamento",
    "projetos.filtro.finalizados": "Finalizados",
    "projetos.em_andamento": "Projetos em Andamento", // Mantido para consistência
    "projetos.finalizados": "Projetos Finalizados", // Mantido para consistência
    "projetos.nenhum_encontrado": "Nenhum projeto encontrado para este filtro.",
    // Mensagens do script.js
    "projetos.carregando": "Carregando projetos...",
    "projetos.erro": "❌ Erro ao carregar projetos. Verifique a conexão com o servidor."
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
    // Projects Page
    "projetos.titulo_pagina": "AgriRS - Projects",
    "projetos.titulo_principal": "Projects",
    "projetos.descricao": "Discover the projects developed by AgriRSLab, from ongoing research to completed works that contribute to the advancement of remote sensing in agriculture.",
    "projetos.filtro.todos": "All",
    "projetos.filtro.andamento": "Ongoing",
    "projetos.filtro.finalizados": "Completed",
    "projetos.em_andamento": "Ongoing Projects", // Kept for consistency
    "projetos.finalizados": "Completed Projects", // Kept for consistency
    "projetos.nenhum_encontrado": "No projects found for this filter.",
    // Messages from script.js
    "projetos.carregando": "Loading projects...",
    "projetos.erro": "❌ Error loading projects. Check the server connection."
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