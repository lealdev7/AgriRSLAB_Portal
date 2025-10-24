document.addEventListener("DOMContentLoaded", function () {
    var botoes = document.querySelectorAll(".botao-filtro");
    var itens = document.querySelectorAll(".item-galeria");

    botoes.forEach(function (botao) {
        botao.addEventListener("click", function () {
            var filtro = botao.getAttribute("data-filtro");

            // Marca o botão ativo
            botoes.forEach(function (b) {
                b.classList.remove("ativo");
            });
            botao.classList.add("ativo");

            // Filtra os itens
            itens.forEach(function (item) {
                if (filtro === "todos" || item.classList.contains(filtro)) {
                    item.style.display = "block";
                    setTimeout(() => item.style.opacity = "1", 50);
                } else {
                    item.style.opacity = "0";
                    setTimeout(() => item.style.display = "none", 400);
                }
            });
        });
    });
});
