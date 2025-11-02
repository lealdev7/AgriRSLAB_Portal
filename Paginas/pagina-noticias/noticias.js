
// Converte '2025-10-27T03:00:00.000Z' para '27/10/2025'
function formatarData(dataISO) {
  const data = new Date(dataISO);
  const dia = String(data.getUTCDate()).padStart(2, '0');
  const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // +1 porque meses começam em 0
  const ano = data.getUTCFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Retorna o nome do mês em português (ex: "Janeiro")
function getNomeMes(dataISO) {
  const data = new Date(dataISO);
  // 'pt-BR' para português, 'long' para o nome completo
  return data.toLocaleString('pt-BR', { month: 'long', timeZone: 'UTC' });
}

// --- Lógica Principal ---

// Roda o código quando o HTML da página terminar de carregar
document.addEventListener('DOMContentLoaded', () => {
  
  // Carrossel horizontal (defesas)
const setaEsquerda = document.querySelector('.seta-esquerda');
const setaDireita = document.querySelector('.seta-direita');
const cardsDefesas = document.querySelector('.cards-defesas');

if (setaEsquerda && setaDireita && cardsDefesas) {
    setaDireita.addEventListener('click', () => {
      cardsDefesas.scrollBy({ left: 200, behavior: 'smooth' });
    });
    setaEsquerda.addEventListener('click', () => {
      cardsDefesas.scrollBy({ left: -200, behavior: 'smooth' });
    });
  }

// Carrossel vertical (linha do tempo)
const setaCima = document.querySelector('.seta-cima');
const setaBaixo = document.querySelector('.seta-baixo');
const conteudoLinha = document.querySelector('.conteudo-linha');

if (setaCima && setaBaixo && conteudoLinha) {
    setaBaixo.addEventListener('click', () => {
      conteudoLinha.scrollBy({ top: 100, behavior: 'smooth' });
    });
    setaCima.addEventListener('click', () => {
      conteudoLinha.scrollBy({ top: -100, behavior: 'smooth' });
    });
  }
  // --- MÓDULO 3: Compartilhamento de Notícias ---
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const shareWhatsApp = document.getElementById("shareWhatsApp");
  const shareEmail = document.getElementById("shareEmail");
  const shareLinkedIn = document.getElementById("shareLinkedIn");
  // As verificações de segurança já existiam aqui (o que é ótimo)
  if (shareWhatsApp) {
    shareWhatsApp.href = `https://api.whatsapp.com/send?text=${title}%20${url}`;
  }
  if (shareEmail) {
    shareEmail.href = `mailto:?subject=${title}&body=Veja%20essa%20matéria:%20${url}`;
  }
  if (shareLinkedIn) {
    shareLinkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  }
  
  // Chama a função para carregar as notícias PAG NOTICIAS1
  carregarNoticias();
  // Chama a função para carregar as notícias principais PAG NOTICIAS
  carregarNoticiasPrincipais();

});

// Função principal para buscar e exibir as notícias
async function carregarNoticias() {
  const container = document.getElementById('container-noticias-dinamicas');
  if (!container) return; // Para o script se o container não existir

  try {
    // 1. FAZ A CHAMADA (FETCH) PARA A SUA API
    const response = await fetch('/api/noticias'); // (Lembre-se que o back-end deve ordenar por data)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const noticias = await response.json();

    if (noticias.length === 0) {
      container.innerHTML = '<p style="text-align: center; margin: 20px;">Nenhuma notícia encontrada.</p>';
      return;
    }

    // 2. Lógica para agrupar por MÊS (como no seu exemplo)
    let mesAtual = '';
    let anoAtual = '';

    // Limpa o container
    container.innerHTML = '';

    noticias.forEach(noticia => {
      const dataNoticia = new Date(noticia.data);
      const nomeMes = getNomeMes(noticia.data);
      const anoNoticia = dataNoticia.getUTCFullYear();

      // 3. Verifica se o mês ou ano mudou
      if (nomeMes !== mesAtual || anoNoticia !== anoAtual) {
        // Atualiza os marcadores
        mesAtual = nomeMes;
        anoAtual = anoNoticia;

        // Adiciona o Título do Mês (como no seu molde)
        // (capitalize() é para "janeiro" virar "Janeiro")
        const nomeMesCapitalizado = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
        container.innerHTML += `<h2 class="titleMonth">${nomeMesCapitalizado}</h2>`;
      }

      // 4. CRIA O HTML DO ARTIGO (usando seu molde exato)
      const noticiaHtml = `
                    <article class="cardNotice">
                        <div class="imageConteinerNotice">
                            <img class="imageNotice" src="${noticia.url_imagem}" alt="imagem noticia">
                        </div>
                        <div class="cardBoxNotice">
                            <h3 class="titleNotice">${noticia.titulo}</h3>
                            <p class="contentNotice">${noticia.texto}</p>
                            <div class="cardBoxBottomTag">
                                <span class="dateEvent"><time datetime="${noticia.data}">${formatarData(noticia.data)}</time></span>
                                <span class="tagEvent">${noticia.categoria}</span>
                            </div>
                        </div>
                        <a href="${noticia.url_noticia}" class="seeMore">Ver Detalhes</a>
                    </article>
                `;

      // 5. Adiciona o HTML do artigo logo após o título do mês
      container.innerHTML += noticiaHtml;
    });

  } catch (error) {
    console.error('Falha ao carregar notícias:', error);
    container.innerHTML = '<p style="text-align: center; color: red;">Erro ao carregar notícias.</p>';
  }
}

async function carregarNoticiasPrincipais() {
  const container = document.getElementById('cards-noticias');
  if (!container) return;

  try {
    const response = await fetch('/api/noticias/destaques', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const noticiasDestaque = await response.json();

    const verTodasBtn = container.querySelector('.ver-todas');
    container.innerHTML = ''; // Limpa o container

    // Pegar apenas as 3 primeiras notícias
    const noticiasParaExibir = noticiasDestaque.slice(0, 3);

    if (noticiasDestaque.length === 0) {
      container.innerHTML = '<p style="text-align: center; margin: 20px;">Nenhuma notícia encontrada.</p>';
      
      if (verTodasBtn) {
      container.appendChild(verTodasBtn);

      return;
    }
    }

    noticiasParaExibir.forEach(noticia => {
      const dataFormatada = new Date(noticia.data).toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'short', year: 'numeric'}).toUpperCase().replace('.', '');

      const cardHtml = `
          <a href="${noticia.url_noticia || '#'}">
              <div class="card-noticia">
                  <img src="${noticia.url_imagem}" alt="${noticia.titulo}">
                  <div class="texto">
                      <h3>${noticia.titulo}</h3>
                      <p>${noticia.subtitulo || ''}</p>
                      <span>${dataFormatada}</span>
                      <p class="continuar-lendo">Ler mais</p>
                  </div>
              </div>
          </a>
      `;

      container.innerHTML += cardHtml;
    });

    if (verTodasBtn) {
      container.appendChild(verTodasBtn);
    }

  } catch (error) {
    console.error('Falha ao carregar notícias:', error);
    container.innerHTML = '<p style="text-align: center; color: red;">Erro ao carregar notícias.</p>';
  }
}
