const express = require('express');
const rotas = require("./routes");
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

//conf server

const app = express();
const port = process.env.Port;

app.use(express.json());

// O __dirname aqui é: '.../AgriRSLAB_Portal/Paginas'
const projectRoot = path.join(__dirname, '..');

// --- Definição das Pastas Estáticas (NÃO MEXER A ORDEM IMPORTA!) ---
// 1. 'pagina-inicial' COMO SE FOSSE A RAIZ '/'
app.use(express.static(path.join(__dirname, 'pagina-inicial')));
// 2. Sirva o resto da pasta 'Paginas' (para /HeaderFooter/style.css)
app.use(express.static(__dirname));
// 3. Sirva a pasta raiz do projeto (para imagens fora de Paginas)
app.use(express.static(projectRoot));
app.use(express.static(__dirname));

// Redirecione a raiz '/' para '/pagina-inicial/'
app.get('/', (_req, res) => {
  // A barra '/' no final é importante.
  res.redirect('/pagina-inicial/');
});

//import rotas e cnexão do server com as rotas
app.use('/api', rotas);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Middleware para rotas não encontradas
app.use(function(_req, res){
  res.status(404).json({ error: "Rota não encontrada"});
});





