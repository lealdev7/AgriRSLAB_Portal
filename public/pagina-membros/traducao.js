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
    // Página de Membros
    "membros.titulo_pagina": "AgriRS - Membros",
    "membros.junte_se_titulo": "Junte-se ao nosso time!",
    "membros.junte_se_subtitulo": "Conecte-se com pesquisadores, acompanhe projetos inovadores e tenha acesso a conteúdos e experiências exclusivas.",
    "membros.junte_se_botao": "Clique aqui e se torne um membro!",
    "membros.titulo_principal": "Conheça nossa Equipe",
    "membros.subtitulo_principal": "Os membros do AGRiRS Lab trabalham juntos para avançar nas pesquisas ambientais e atmosféricas.",
    "membros.cat.coordenacao": "Coordenação",
    "membros.cat.pesquisadores": "Pesquisadores",
    "membros.cat.doutorandos": "Doutorandos",
    "membros.cat.mestrandos": "Mestrandos",
    "membros.cat.bolsistas": "Bolsistas",
    "membros.lattes": "Currículo Lattes",
    // Mensagens do script.js
    "membros.carregando": "Carregando membros...",
    "membros.erro": "❌ Erro ao carregar membros. Verifique a conexão com o servidor."
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
    // Members Page
    "membros.titulo_pagina": "AgriRS - Members",
    "membros.junte_se_titulo": "Join our team!",
    "membros.junte_se_subtitulo": "Connect with researchers, follow innovative projects, and get access to exclusive content and experiences.",
    "membros.junte_se_botao": "Click here to become a member!",
    "membros.titulo_principal": "Meet our Team",
    "membros.subtitulo_principal": "The members of AGRiRS Lab work together to advance environmental and atmospheric research.",
    "membros.cat.coordenacao": "Coordination",
    "membros.cat.pesquisadores": "Researchers",
    "membros.cat.doutorandos": "PhD Students",
    "membros.cat.mestrandos": "MSc Students",
    "membros.cat.bolsistas": "Fellows",
    "membros.lattes": "Lattes Curriculum",
    // Messages from script.js
    "membros.carregando": "Loading members...",
    "membros.erro": "❌ Error loading members. Check the server connection."
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
}

window.setPageLanguage = setPageLanguage;

function applyInitialTranslation() {
  const saved = localStorage.getItem("lang") || "pt";
  setPageLanguage(saved);
}

document.addEventListener('headerLoaded', applyInitialTranslation);
document.addEventListener('footerLoaded', applyInitialTranslation);
window.addEventListener("DOMContentLoaded", applyInitialTranslation);