DROP TABLE IF EXISTS noticias, categoria_noticias, vagas CASCADE;

CREATE TABLE IF NOT EXISTS "categoria_noticias" (
	"id_categoria_noticias" serial NOT NULL UNIQUE,
	"categoria" varchar(30) NOT NULL,
	PRIMARY KEY ("id_categoria_noticias")
);

CREATE TABLE IF NOT EXISTS "noticias" (
 "id_noticias" serial NOT NULL UNIQUE,
 "titulo" varchar(255) NOT NULL,
 "subtitulo" varchar(100),
 "data" timestamp with time zone NOT NULL,
 "url_imagem" varchar(255) NOT NULL,
 "texto" varchar(5000) NOT NULL,
 "categoria" varchar(30) NOT NULL,
 "url_noticia" varchar(255),
 "destaque" boolean NOT NULL,
 PRIMARY KEY ("id_noticias")
);

CREATE TABLE IF NOT EXISTS "vagas" (
	"id_vagas" serial NOT NULL UNIQUE,
	"titulo" varchar(50) NOT NULL,
	"descricao" varchar(255) NOT NULL,
	"requisitos" varchar(255) NOT NULL,
	"beneficios" varchar(255) NOT NULL,
	"ativo" boolean NOT NULL,
	"data" timestamp with time zone NOT NULL,
	PRIMARY KEY ("id_vagas")
);

-- A tabela FILHA ("noticias") referencia a tabela PAI ("categoria_noticias")
ALTER TABLE "noticias" ADD CONSTRAINT "noticias_fk1"
FOREIGN KEY ("categoria") REFERENCES "categoria_noticias"("categoria");

--- criando as categorias de notícias----
INSERT INTO "categoria_noticias" (categoria) VALUES ('Curso');
INSERT INTO "categoria_noticias" (categoria) VALUES ('Defesa');
INSERT INTO "categoria_noticias" (categoria) VALUES ('Informativo');


INSERT INTO noticias (
"titulo",
"subtitulo",
"data",
"url_imagem",
"texto",
"categoria",
"url_noticia",
"destaque"
) VALUES (
'Nova Descoberta Científica Anunciada', 
'Pesquisadores encontram evidências de água em Marte.', 
NOW(), 
'https://meusite.com/imagens/marte.jpg', 
'O texto completo da notícia sobre a descoberta, detalhando os métodos e as implicações...', 
'Curso', 
'https://meusite.com/noticias/ciencia/descoberta-marte', 
true
);
INSERT INTO noticias (
"titulo",
"subtitulo",
"data",
"url_imagem",
"texto",
"categoria",
"url_noticia",
"destaque"
) VALUES (
'Matrícula', 
'Matricula no semestre 2025.1.', 
'2025-01-20', 
'imagens\imagetest.png', 
'Está chegando o prazo final para matricula no semestre letivo, não perca tempo.', 
'Curso', 
'https://meusite.com/noticias/ciencia/descoberta-marte', 
true
);


select * from noticias 