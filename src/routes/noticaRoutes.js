const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticiaController');
const multer = require('multer')
const path = require('path');

// --- Configuração do Multer para Upload de Imagem ---
const uploadDir = path.resolve(__dirname, '..', '..', 'public', 'uploads', 'noticias');
// Garante que o diretório exista
const fs = require('fs');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'noticia-' + uniqueSuffix + ext);
    }
});
const upload = multer({ storage: storage });
// ----------------------------------------------------



// ===== Rotas para o CRUD de notícias (pulblico) =====
router.get('/', noticeController.getAllNoticias);
router.put('/:id',noticeController.updateNoticia);
router.delete('/:id', noticeController.deleteNoticia);
router.post('/', noticeController.createNoticia);

router.get('/destaques', noticeController.getDestaqueNoticias);
router.get('/eventos', noticeController.getEventosMesAtual);
router.get('/defesas', noticeController.getDefesasNoticias);
router.delete('/', noticeController.deleteAllNoticias);
router.patch('/:id/toggle', noticeController.toggleNoticiaExibir);

// === ROTAS DE ADMIN (para o painel) ===

// GET: Lista TODAS as notícias (incluindo as ocultas)
router.get('/admin', noticeController.getAllNoticiasAdmin);

// POST: Criar notícia (com upload de imagem)
router.post('/', upload.single('imagem'), noticeController.createNoticia);

// PUT: Atualizar notícia (com upload opcional de nova imagem)
router.put('/:id', upload.single('imagem'), noticeController.updateNoticia);

// PATCH: Mudar o status 'exibir' (o switch)
router.patch('/:id/toggle', noticeController.toggleNoticiaExibir);

// DELETE: Deletar notícia
router.delete('/:id', noticeController.deleteNoticia);



module.exports = router;