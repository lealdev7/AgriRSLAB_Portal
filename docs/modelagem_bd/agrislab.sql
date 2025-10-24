CREATE TABLE IF NOT EXISTS "noticias" (
	"id_noticias" serial NOT NULL UNIQUE,
	"titulo" varchar(30) NOT NULL,
	"subtitulo" varchar(100),
	"data" timestamp with time zone NOT NULL,
	"url_imagem" varchar(255) NOT NULL,
	"texto" varchar(5000) NOT NULL,
	"categoria" varchar(30) NOT NULL,
	"destaque" boolean NOT NULL,
	PRIMARY KEY ("id_noticias")
);

CREATE TABLE IF NOT EXISTS "publicacoes" (
	"id_publicacoes" serial NOT NULL UNIQUE,
	"titulo" varchar(50) NOT NULL,
	"autores" varchar(255) NOT NULL,
	"data" timestamp with time zone NOT NULL,
	"url_imagem" varchar(255) NOT NULL,
	"url_doi" varchar(255) NOT NULL,
	"categoria" varchar(30) NOT NULL,
	PRIMARY KEY ("id_publicacoes")
);

CREATE TABLE IF NOT EXISTS "categoria_noticias" (
	"id_categoria_noticias" serial NOT NULL UNIQUE,
	"categoria" varchar(30) NOT NULL,
	PRIMARY KEY ("id_categoria_noticias")
);

CREATE TABLE IF NOT EXISTS "categoria_publicacoes" (
	"id_categoria_publicacoes" serial NOT NULL UNIQUE,
	"categoria" varchar(30) NOT NULL,
	PRIMARY KEY ("id_categoria_publicacoes")
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



ALTER TABLE "categoria_noticias" ADD CONSTRAINT "categoria_noticias_fk1" FOREIGN KEY ("categoria") REFERENCES "noticias"("categoria");
ALTER TABLE "categoria_publicacoes" ADD CONSTRAINT "categoria_publicacoes_fk1" FOREIGN KEY ("categoria") REFERENCES "publicacoes"("categoria");
