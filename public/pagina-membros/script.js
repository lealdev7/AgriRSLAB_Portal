const API_MEMBERS_URL = 'http://localhost:3000/api/membros/publicos';

function getTranslatedText(key) {
    const lang = localStorage.getItem('lang') || 'pt';
    return translations[lang][key] || key;
}

function createMemberCard(membro) {
    const card = document.createElement('div');
    card.className = 'member-card';

    // O caminho da foto no banco parece ser relativo, ajustamos para a URL completa
    const fotoUrl = membro.foto; // O caminho agora vem correto do banco de dados

    card.innerHTML = `
        <div class="member-photo-container">
            <img src="${fotoUrl}" alt="Foto de ${membro.nome}" class="member-photo" onerror="this.src='https://via.placeholder.com/150?text=Sem+Foto';">
        </div>
        <div class="member-info">
            <p class="member-name">${membro.nome}</p>
            <p class="member-description">${membro.descricao}</p>
            ${membro.link ? `<a href="${membro.link}" target="_blank" rel="noopener noreferrer" class="member-link" data-i18n="membros.lattes">${getTranslatedText('membros.lattes')}</a>` : ''}
        </div>
    `;
    return card;
}

async function loadPublicMembers() {
    const container = document.getElementById('members-container');
    if (!container) return;

    const sections = {
        'Coordenação': container.querySelector('[data-category="Coordenação"] .members-grid'),
        'Pesquisadores': container.querySelector('[data-category="Pesquisadores"] .members-grid'),
        'Doutorandos': container.querySelector('[data-category="Doutorandos"] .members-grid'),
        'Mestrandos': container.querySelector('[data-category="Mestrandos"] .members-grid'),
        'Bolsistas': container.querySelector('[data-category="Bolsistas"] .members-grid'),
    };

    // Exibe mensagem de carregamento em cada seção
    Object.values(sections).forEach(grid => {
        if (grid) grid.innerHTML = `<p data-i18n="membros.carregando">${getTranslatedText('membros.carregando')}</p>`;
    });

    try {
        const response = await fetch(API_MEMBERS_URL);
        if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
        
        const membros = await response.json();

        // Limpa as mensagens de carregamento
        Object.values(sections).forEach(grid => {
            if (grid) grid.innerHTML = '';
        });

        membros.forEach(membro => {
            // Mapeia o ID da categoria para o nome da seção esperado pelo HTML
            let nomeCategoria;
            switch (membro.id_categoria) {
                case 1: nomeCategoria = 'Coordenação'; break;
                case 2: nomeCategoria = 'Pesquisadores'; break;
                case 3: nomeCategoria = 'Doutorandos'; break;
                case 4: nomeCategoria = 'Mestrandos'; break;
                case 5: nomeCategoria = 'Bolsistas'; break;
                default: nomeCategoria = null;
            }

            const gridDestino = sections[nomeCategoria];

            if (gridDestino) {
                gridDestino.appendChild(createMemberCard(membro));
            } else {
                console.warn(`Categoria com ID "${membro.id_categoria}" não corresponde a nenhuma seção no HTML.`);
            }
        });

        // Esconde seções que ficaram vazias
        Object.entries(sections).forEach(([category, grid]) => {
            if (grid && grid.children.length === 0) {
                grid.closest('.members-section').style.display = 'none';
            }
        });

    } catch (error) {
        console.error('Erro ao carregar membros:', error);
        container.innerHTML = `<p class="error-message">${getTranslatedText('membros.erro')}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadPublicMembers);