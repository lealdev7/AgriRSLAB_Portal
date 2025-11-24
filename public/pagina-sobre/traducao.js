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
    // Página Sobre
    "sobre.titulo_pagina": "Sobre - AGRIRS LAB",
    "sobre.paragrafo1": "O Laboratório de Agricultura e Sensoriamento Remoto (AgriRSLab) é um grupo de pesquisa vinculado à Divisão de Observação da Terra e Geoinformática (DIOTG) do Instituto Nacional de Pesquisas Espaciais (INPE).",
    "sobre.paragrafo2": "Somos um laboratório com foco na agricultura, estudando e monitorando cultivos agrícolas com o apoio de imagens de satélite e dados geoespaciais. Também desenvolvemos pesquisas em áreas ambientais e sociais, como detecção do desmatamento e mudanças no uso e cobertura da terra. Buscamos conectar tecnologia, ciência e responsabilidade socioambiental para gerar conhecimento e apoiar a tomada de decisões.",
    "sobre.parceiros_titulo": "AGÊNCIAS DE FOMENTO E COLABORADORES"
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
    // About Page
    "sobre.titulo_pagina": "About - AGRIRS LAB",
    "sobre.paragrafo1": "The Agriculture and Remote Sensing Laboratory (AgriRSLab) is a research group linked to the Earth Observation and Geoinformatics Division (DIOTG) of the National Institute for Space Research (INPE).",
    "sobre.paragrafo2": "We are a laboratory focused on agriculture, studying and monitoring agricultural crops with the support of satellite images and geospatial data. We also develop research in environmental and social areas, such as deforestation detection and changes in land use and cover. We seek to connect technology, science, and socio-environmental responsibility to generate knowledge and support decision-making.",
    "sobre.parceiros_titulo": "FUNDING AGENCIES AND COLLABORATORS"
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