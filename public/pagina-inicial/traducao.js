const translations = {
  pt: {
    // Seção Anúncio
    "anuncio-titulo": "AgriRS",
    "anuncio-paragrafo": "Conectando tecnologia, ciência e responsabilidade socioambiental para gerar conhecimento e apoiar a tomada de decisões.",
    // Seção Áreas de Pesquisa
    "areas-titulo": "Inovação no Campo Nossas Áreas de Pesquisa",
    "card-area-1-titulo": "Mapeamento Agrícola",
    "card-area-1-texto": "O AgriRS Lab usa satélites e sensoriamento remoto para mapear as principais culturas do Brasil, auxiliando no planejamento agrícola e na análise de uso e ocupação do solo.",
    "card-area-2-titulo": "Previsão de Safras e Perdas",
    "card-area-2-texto": "Aplicação de modelos climáticos e dados orbitais para mitigar riscos e garantir a segurança alimentar.",
    "card-area-3-titulo": "Monitoramento de Safras",
    "card-area-3-texto": "Identificação dos ciclos de cultivo por satélite, apoiando o manejo de campo e a estimativa de produtividade.",
    "card-area-4-titulo": "Detecção de Desmatamento",
    "card-area-4-texto": "Uso de sensoriamento remoto e algoritmos para detectar mudanças no uso da terra e apoiar a preservação dos biomas.",
    "card-area-5-titulo": "Gestão de Recursos Hídricos",
    "card-area-5-texto": "Análise de bacias hidrográficas e avaliação do impacto ambiental para promover práticas agrícolas sustentáveis.",
    // Seção Projetos
    "projetos-slogan": "Nossas pesquisas transformam dados de satélite em soluções para uma agricultura mais produtiva e sustentável.",
    "projeto-destaque-titulo": "Sensoriamento de Resíduos Culturais no Solo",
    "projeto-destaque-texto": "Estimativa do percentual de cobertura do solo por resíduos culturais através de sensoriamento remoto orbital.",
    "ver-projetos-btn": "Ver todos os projetos",
    // Seção Notícias
    "noticias-titulo": "Últimas Notícias",
    "noticia-principal-titulo": "AgriRS Lab lança plataforma de monitoramento de culturas",
    "noticia-principal-texto": "Pesquisadores do INPE e parceiros do AgriRS Lab anunciaram um protótipo de satélite capaz de monitorar o desenvolvimento das raízes das culturas em tempo quase real. A combinação de sensores de radar e modelos de inteligência artificial permite estimar perdas e ganhos de produtividade com antecedência de até 30 dias.",
    "noticia-secundaria-1-titulo": "Simpósio de Geoprocessamento destaca avanços na Modelagem de Sistemas Hídricos",
    "noticia-secundaria-1-texto": "Evento reúne pesquisadores e estudantes para discutir o uso de tecnologias espaciais no monitoramento e gestão inteligente dos recursos hídricos.",
    "noticia-secundaria-2-titulo": "Último dia de inscrição para a I SEMAT — Semana de Materiais Agrícolas",
    "noticia-secundaria-2-texto": "Evento reúne especialistas e estudantes para debater inovação, sustentabilidade e novos materiais aplicados ao setor agrícola.",
    "leia-mais": "Leia mais",
    "ver-noticias-link": "Ver todas as notícias"
  },
  en: {
    // Section Announcement
    "anuncio-titulo": "AgriRS",
    "anuncio-paragrafo": "Connecting technology, science, and socio-environmental responsibility to generate knowledge and support decision-making.",
    // Section Research Areas
    "areas-titulo": "Innovation in the Field Our Research Areas",
    "card-area-1-titulo": "Agricultural Mapping",
    "card-area-1-texto": "AgriRS Lab uses satellites and remote sensing to map Brazil's main crops, aiding in agricultural planning and land use analysis.",
    "card-area-2-titulo": "Harvest and Loss Forecasting",
    "card-area-2-texto": "Application of climate models and orbital data to mitigate risks and ensure food security.",
    "card-area-3-titulo": "Crop Monitoring",
    "card-area-3-texto": "Identification of cultivation cycles by satellite, supporting field management and productivity estimation.",
    "card-area-4-titulo": "Deforestation Detection",
    "card-area-4-texto": "Use of remote sensing and algorithms to detect changes in land use and support the preservation of biomes.",
    "card-area-5-titulo": "Water Resources Management",
    "card-area-5-texto": "Analysis of river basins and environmental impact assessment to promote sustainable agricultural practices.",
    // Section Projects
    "projetos-slogan": "Our research transforms satellite data into solutions for a more productive and sustainable agriculture.",
    "projeto-destaque-titulo": "Sensing of Crop Residues in the Soil",
    "projeto-destaque-texto": "Estimation of the percentage of soil cover by crop residues through orbital remote sensing.",
    "ver-projetos-btn": "See all projects",
    // Section News
    "noticias-titulo": "Latest News",
    "noticia-principal-titulo": "AgriRS Lab launches crop monitoring platform",
    "noticia-principal-texto": "Researchers from INPE and partners at AgriRS Lab announced a satellite prototype capable of monitoring crop root development in near real-time. The combination of radar sensors and artificial intelligence models allows for estimating productivity losses and gains up to 30 days in advance.",
    "noticia-secundaria-1-titulo": "Geoprocessing Symposium highlights advances in Water Systems Modeling",
    "noticia-secundaria-1-texto": "Event brings together researchers and students to discuss the use of space technologies in the monitoring and intelligent management of water resources.",
    "noticia-secundaria-2-titulo": "Last day to register for the I SEMAT — Agricultural Materials Week",
    "noticia-secundaria-2-texto": "Event brings together experts and students to debate innovation, sustainability, and new materials applied to the agricultural sector.",
    "leia-mais": "Read more",
    "ver-noticias-link": "See all news"
  }
};
 
let currentLang = "pt";
 
function setLanguage(lang) {
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
 
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang");
  setLanguage(saved || "pt");
});

 