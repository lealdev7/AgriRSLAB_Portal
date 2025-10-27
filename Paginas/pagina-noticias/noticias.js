// Carrossel horizontal (defesas)
const setaEsquerda = document.querySelector('.seta-esquerda');
const setaDireita = document.querySelector('.seta-direita');
const cardsDefesas = document.querySelector('.cards-defesas');

setaDireita.addEventListener('click', () => {
  cardsDefesas.scrollBy({ left: 300, behavior: 'smooth' });
});

setaEsquerda.addEventListener('click', () => {
  cardsDefesas.scrollBy({ left: -300, behavior: 'smooth' });
});

// Carrossel vertical (linha do tempo)
const setaCima = document.querySelector('.seta-cima');
const setaBaixo = document.querySelector('.seta-baixo');
const conteudoLinha = document.querySelector('.conteudo-linha');

setaBaixo.addEventListener('click', () => {
  conteudoLinha.scrollBy({ top: 100, behavior: 'smooth' });
});

setaCima.addEventListener('click', () => {
  conteudoLinha.scrollBy({ top: -100, behavior: 'smooth' });
});


// Compartilhamento de notícias
document.addEventListener("DOMContentLoaded", () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

  const shareWhatsApp = document.getElementById("shareWhatsApp");
  const shareEmail = document.getElementById("shareEmail");
  const shareLinkedIn = document.getElementById("shareLinkedIn");

  if (shareWhatsApp) {
    shareWhatsApp.href = `https://api.whatsapp.com/send?text=${title}%20${url}`;
  }

  if (shareEmail) {
    shareEmail.href = `mailto:?subject=${title}&body=Veja%20essa%20matéria:%20${url}`;
  }

  if (shareLinkedIn) {
    shareLinkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  }
});