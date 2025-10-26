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
