const { pool } = require('../database/dbConfig');
const fs = require('fs');
const path = require('path');

const uploadDir = path.resolve(__dirname, '..', '..', 'public', 'uploads', 'noticias');


// GET ALL notícias
async function getAllNoticias(_req, res) {
  try {
    const result = await pool.query('SELECT * FROM noticias WHERE exibir = true ORDER BY data_criacao DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    res.status(500).json({ error: 'Erro ao buscar notícias' });
  }
};

//GET ALL notícias (Admin - Traz todas com ou sem exibir true)
async function getAllNoticiasAdmin(_req, res) {
  try {
    const result = await pool.query('SELECT * FROM noticias ORDER BY data_criacao DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar notícias (admin):', error);
    res.status(500).json({ error: 'Erro ao buscar notícias (admin)' });
  }
};

// GET notícias DESTAQUE
async function getDestaqueNoticias(_req, res) {
  try {
    const result = await pool.query(
      'SELECT * FROM noticias WHERE destaque = true AND exibir = true ORDER BY data_criacao DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar notícias destaque:', error);
    res.status(500).json({ error: 'Erro ao buscar notícias destaque' });
  }
};

//GET notícias DEFESA
async function getDefesasNoticias(_req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM noticias WHERE categoria = 'Defesa' AND exibir = true ORDER BY data_criacao DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar notícias de defesa:', error);
    res.status(500).json({ error: 'Erro ao buscar notícias de defesa' });
  }
};

// GET apenas Eventos do Mês Atual
async function getEventosMesAtual(_req, res) {
  try {
    const result = await pool.query(
      `SELECT * FROM noticias 
       WHERE 
         exibir = true 
         AND EXTRACT(MONTH FROM data_criacao) = EXTRACT(MONTH FROM NOW())
         AND EXTRACT(YEAR FROM data_criacao) = EXTRACT(YEAR FROM NOW())
       ORDER BY data_criacao DESC`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar eventos do mês:', error);
    res.status(500).json({ error: 'Erro ao buscar eventos do mês' });
  }
};

//DELETE noticia (com fs.unlink)
async function deleteNoticia(req, res) {
  const { id } = req.params;

  try {
    // 1. Pega o caminho da imagem antes de deletar
    const oldData = await pool.query('SELECT url_imagem FROM noticias WHERE id_noticias = $1', [id]);
    if (oldData.rows.length === 0) {
      return res.status(404).json({ error: 'Notícia não encontrada para exclusão' });
    }
    const oldImagePath = oldData.rows[0].url_imagem;

    // 2. Deleta do banco
    const result = await pool.query('DELETE FROM noticias WHERE id_noticias = $1 RETURNING *', [id]);

    // 3. Deleta o arquivo de imagem do disco
    if (oldImagePath) {
        const fullOldPath = path.join(uploadDir, path.basename(oldImagePath));
        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
        }
    }

    res.status(200).json({ message: 'Notícia deletada com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar notícia:', error);
    res.status(500).json({ error: 'Erro ao deletar notícia' });
  }
}

//DELETE all noticias
async function deleteAllNoticias(_req, res) {
  try {
    await pool.query('TRUNCATE TABLE noticias RESTART IDENTITY CASCADE');
    res.status(200).json({ message: 'Todas as notícias foram deletadas com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar todas as notícias:', error);
    res.status(500).json({ error: 'Erro ao deletar todas as notícias' });
  }
}

//CREATE noticia (com Multer)
async function createNoticia(req, res) {
  let { titulo, subtitulo, data_criacao, texto, categoria, destaque, url_noticia, exibir } = req.body;
  
  // Trata 'exibir' e 'destaque' que vêm do FormData
  exibir = (exibir === 'on' || exibir === 'true' || exibir === true);
  destaque = (destaque === 'on' || destaque === 'true' || destaque === true);

  // Verifica se o arquivo foi enviado
  if (!req.file) {
    return res.status(400).json({ error: 'A imagem da notícia é obrigatória.' });
  }
  
  // Salva o caminho relativo da imagem
  const url_imagem = `/uploads/noticias/${req.file.filename}`;

  try {
    const result = await pool.query(
      `INSERT INTO noticias (titulo, subtitulo, data_criacao, url_imagem, texto, categoria, destaque, url_noticia, exibir)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [titulo, subtitulo, data_criacao, url_imagem, texto, categoria, destaque, url_noticia, exibir]
    );

    const noticia = result.rows[0];
    res.status(201).json({
      message: 'Notícia criada com sucesso!',
      noticia
    });
  } catch (error) {
    console.error('Erro ao criar notícia:', error);
    res.status(500).json({ error: 'Erro ao criar notícia' });
  }
}
//UPDATE noticia (com Multer)
async function updateNoticia(req, res) {
  const { id } = req.params;
  let { titulo, subtitulo, data_criacao, texto, categoria, destaque, url_noticia, exibir } = req.body;

  // Trata 'exibir' e 'destaque'
  exibir = (exibir === 'on' || exibir === 'true' || exibir === true);
  destaque = (destaque === 'on' || destaque === 'true' || destaque === true);

  try {
    // 1. Pega o caminho da imagem antiga
    const oldData = await pool.query('SELECT url_imagem FROM noticias WHERE id_noticias = $1', [id]);
    const oldImagePath = oldData.rows[0]?.url_imagem;

    let nova_url_imagem;

    // 2. Se uma nova imagem foi enviada...
    if (req.file) {
      nova_url_imagem = `/uploads/noticias/${req.file.filename}`;
      
      // 3. ...deleta a imagem antiga do disco
      if (oldImagePath) {
        const fullOldPath = path.join(uploadDir, path.basename(oldImagePath));
        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
        }
      }
    } else {
      // 2b. Se não, mantém a imagem antiga
      nova_url_imagem = oldImagePath;
    }

    // 4. Atualiza o banco
    const result = await pool.query(
      `UPDATE noticias
       SET 
         titulo = $1, subtitulo = $2, data_criacao = $3, url_imagem = $4, 
         texto = $5, categoria = $6, destaque = $7, url_noticia = $8, exibir = $9
       WHERE id_noticias = $10
       RETURNING *`,
      [titulo, subtitulo, data_criacao, nova_url_imagem, texto, categoria, destaque, url_noticia, exibir, id] 
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notícia não encontrada para atualização' });
    }
    
    res.status(200).json({
      message: 'Notícia atualizada com sucesso!',
      noticia: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar notícia:', error);
    res.status(500).json({ error: 'Erro ao atualizar notícia' });
  }
}

async function toggleNoticiaExibir(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE noticias SET exibir = NOT exibir WHERE id_noticias = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notícia não encontrada' });
    }
    res.status(200).json({
      message: 'Status de exibição atualizado!',
      noticia: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar exibição da notícia:', error);
    res.status(500).json({ error: 'Erro ao atualizar exibição' });
  }
}


module.exports = {
  createNoticia,
  getAllNoticias,
  getEventosMesAtual,
  getDestaqueNoticias,
  getDefesasNoticias,
  updateNoticia,
  deleteNoticia,
  deleteAllNoticias,
  getAllNoticiasAdmin,
  toggleNoticiaExibir
};

