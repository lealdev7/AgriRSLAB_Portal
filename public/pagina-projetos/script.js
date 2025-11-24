const API_PROJECTS_URL = 'http://localhost:3000/api/projetos/publicos';

function getTranslatedText(key) {
    const lang = localStorage.getItem('lang') || 'pt';
    return translations[lang][key] || key;
}

function createProjectCard(projeto) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const imageUrl = projeto.url_imagem ? `http://localhost:3000${projeto.url_imagem}` : 'https://via.placeholder.com/400x250?text=Sem+Imagem';

    card.innerHTML = `
        <div class="project-image-container">
            <img src="${imageUrl}" alt="Imagem do projeto: ${projeto.titulo}" onerror="this.src='https://via.placeholder.com/400x250?text=Sem+Imagem';">
        </div>
        <div class="project-content">
            <h3 class="project-title">${projeto.titulo}</h3>
            <p class="project-description">${projeto.conteudo}</p>
            <div class="project-authors">
                <strong data-i18n="projetos.autores">${getTranslatedText('projetos.autores')}</strong>
                <p>${projeto.autores.replace(/\n/g, '<br>')}</p>
            </div>
        </div>
    `;
    return card;
}

async function loadPublicProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const sections = {
        'em-andamento': container.querySelector('[data-phase="em-andamento"] .projects-grid'),
        'finalizado': container.querySelector('[data-phase="finalizado"] .projects-grid'),
    };

    // Exibe mensagem de carregamento
    Object.values(sections).forEach(grid => {
        if (grid) grid.innerHTML = `<p data-i18n="projetos.carregando">${getTranslatedText('projetos.carregando')}</p>`;
    });

    try {
        const response = await fetch(API_PROJECTS_URL);
        if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
        
        const projetos = await response.json();

        // Limpa as mensagens de carregamento
        Object.values(sections).forEach(grid => {
            if (grid) grid.innerHTML = '';
        });

        projetos.forEach(projeto => {
            const gridDestino = sections[projeto.fase];
            if (gridDestino) {
                gridDestino.appendChild(createProjectCard(projeto));
            }
        });

        // Esconde seções que ficaram vazias
        Object.entries(sections).forEach(([phase, grid]) => {
            if (grid && grid.children.length === 0) {
                grid.closest('.projects-section').style.display = 'none';
            }
        });

    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        container.innerHTML = `<p class="error-message">${getTranslatedText('projetos.erro')}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadPublicProjects);