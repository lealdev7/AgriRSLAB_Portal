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
    // Página de Contato
    "contato.titulo_pagina": "Fale Conosco - AgriRS",
    "contato.titulo_principal": "Fale Conosco",
    "contato.descricao": "Tem alguma dúvida, sugestão ou interesse em parcerias? Preencha o formulário abaixo e entraremos em contato o mais breve possível.",
    "contato.form.nome": "Nome Completo",
    "contato.form.email": "Seu E-mail",
    "contato.form.assunto": "Assunto",
    "contato.form.mensagem": "Sua Mensagem",
    "contato.form.botao_enviar": "Enviar Mensagem",
    "contato.form.placeholder_mensagem": "Escreva seu comentário, sugestão ou deixe uma mensagem para nossos integrantes.",
    "contato.sucesso": "Mensagem enviada com sucesso! Agradecemos o seu contato.",
    "contato.erro": "Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde."
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
    // Contact Page
    "contato.titulo_pagina": "Contact Us - AgriRS",
    "contato.titulo_principal": "Contact Us",
    "contato.descricao": "Do you have any questions, suggestions, or interest in partnerships? Fill out the form below and we will get in touch as soon as possible.",
    "contato.form.nome": "Full Name",
    "contato.form.email": "Your E-mail",
    "contato.form.assunto": "Subject",
    "contato.form.mensagem": "Your Message",
    "contato.form.botao_enviar": "Send Message",
    "contato.form.placeholder_mensagem": "Write your comment, suggestion, or leave a message for our members.",
    "contato.sucesso": "Message sent successfully! Thank you for your contact.",
    "contato.erro": "An error occurred while sending the message. Please try again later."
  }
};

function setPageLanguage(lang) {
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
    if (translations[lang] && translations[lang][key]) el.placeholder = translations[lang][key];
  });
}

window.setPageLanguage = setPageLanguage;

document.addEventListener('headerLoaded', () => setPageLanguage(localStorage.getItem("lang") || "pt"));
document.addEventListener('footerLoaded', () => setPageLanguage(localStorage.getItem("lang") || "pt"));
window.addEventListener("DOMContentLoaded", () => setPageLanguage(localStorage.getItem("lang") || "pt"));