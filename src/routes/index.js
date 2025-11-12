const express = require("express");
const router = express.Router();


const noticia = require("./notica.routes");
const artigo = require("./artigosRoutes")
const publicArtigosRoutes = require('./publicArtigosRoutes');

router.use('/noticias', noticia);
router.use('/api/artigos', artigo);
router.use('/api/public-artigos', publicArtigosRoutes);


module.exports = router;
