const API_JOBS_URL = 'http://localhost:3000/api/vagas/publicas'; // Assumindo que esta será a sua rota da API

function getTranslatedText(key) {
    const lang = localStorage.getItem('lang') || 'pt';
    return translations[lang][key] || key;
}

function createJobCard(vaga) {
    const card = document.createElement('div');
    card.className = 'job-card';

    // Transforma quebras de linha em <li> para a lista de requisitos
    const requisitosHtml = vaga.requisitos.split('\n').map(req => `<li>${req}</li>`).join('');

    card.innerHTML = `
        <div class="job-header">
            <h3 class="job-title">${vaga.titulo}</h3>
            <span class="job-type">${vaga.tipo}</span>
        </div>
        <p class="job-description">${vaga.descricao}</p>
        <div class="job-requirements">
            <strong data-i18n="vagas.requisitos">${getTranslatedText('vagas.requisitos')}</strong>
            <ul>
                ${requisitosHtml}
            </ul>
        </div>
        <div class="job-footer">
            <a href="${vaga.link_inscricao}" target="_blank" rel="noopener noreferrer" class="btn-apply" data-i18n="vagas.inscreva_se">${getTranslatedText('vagas.inscreva_se')}</a>
        </div>
    `;
    return card;
}

async function loadPublicJobs() {
    const container = document.getElementById('jobs-container');
    if (!container) return;

    container.innerHTML = `<p data-i18n="vagas.carregando">${getTranslatedText('vagas.carregando')}</p>`;

    try {
        const response = await fetch(API_JOBS_URL);
        if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
        
        const vagas = await response.json();
        container.innerHTML = ''; // Limpa o "Carregando..."

        if (vagas.length === 0) {
            container.innerHTML = `<p class="no-jobs-message" data-i18n="vagas.nenhuma_vaga">${getTranslatedText('vagas.nenhuma_vaga')}</p>`;
            return;
        }

        vagas.forEach(vaga => {
            container.appendChild(createJobCard(vaga));
        });

    } catch (error) {
        console.error('Erro ao carregar vagas:', error);
        const errorText = getTranslatedText('vagas.erro');
        container.innerHTML = `<p class="error-message">${errorText}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadPublicJobs);