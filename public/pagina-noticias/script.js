const API_NEWS_URL = 'http://localhost:3000/api/noticias/publicas';

function getFullUrl(path) {
    if (path && !path.startsWith('http')) {
        return `http://localhost:3000${path}`;
    }
    return path;
}

function getTranslatedText(key) {
    const lang = localStorage.getItem('lang') || 'pt';
    return translations[lang][key] || key;
}

function createNewsCard(noticia) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.setAttribute('data-category', noticia.categoria);
    card.setAttribute('data-year', new Date(noticia.data_criacao).getFullYear());

    const imageUrl = getFullUrl(noticia.url_imagem);
    const formattedDate = new Date(noticia.data_criacao).toLocaleDateString('pt-BR');

    card.innerHTML = `
        <div class="card-image-box">
            <img src="${imageUrl}" alt="Imagem da notícia: ${noticia.titulo}" onerror="this.src='https://via.placeholder.com/400x250?text=Sem+Imagem';">
        </div>
        <div class="card-content">
            <span class="card-category">${noticia.categoria}</span>
            <p class="card-title">${noticia.titulo}</p>
            <p class="card-subtitle">${noticia.subtitulo || ''}</p>
            <div class="card-footer">
                <span class="card-date">${formattedDate}</span>
                <a href="${noticia.url_noticia || '#'}" target="_blank" class="btn-card" data-i18n="noticias.leia_mais">${getTranslatedText('noticias.leia_mais')}</a>
            </div>
        </div>
    `;
    return card;
}

async function loadPublicNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    container.innerHTML = `<p data-i18n="noticias.carregando">${getTranslatedText('noticias.carregando')}</p>`;

    try {
        const response = await fetch(API_NEWS_URL);
        if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
        
        const noticias = await response.json();
        container.innerHTML = ''; // Limpa o "Carregando..."

        if (noticias.length === 0) {
            container.innerHTML = `<p>Nenhuma notícia encontrada.</p>`;
            return;
        }

        noticias.forEach(noticia => {
            container.appendChild(createNewsCard(noticia));
        });

        document.dispatchEvent(new Event('newsLoaded'));

    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
        const errorText = getTranslatedText('noticias.erro');
        container.innerHTML = `<p class="error-message">${errorText}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadPublicNews);