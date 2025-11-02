const express = require("express");
const router = express.Router();


const noticia = require("./notica.routes");



router.use('/noticias', noticia);


module.exports = router;
