create database universo_cultural;

use universo_cultural;

create table endereco(
cod int primary key,
uf char (2),
cidade varchar (30),
bairro varchar (25),
rua varchar (30),
referencial varchar (40)
);

CREATE TABLE autor (
cod int primary key,
nome varchar(40)
);

CREATE TABLE editora (
cod int primary key,
nome varchar(40)
);

CREATE TABLE idioma (
cod int primary key,
nome varchar(40)
);

CREATE TABLE genero (
cod int primary key,
nome varchar(40)
);

CREATE TABLE estoque (
cod int primary key,
quantidade int,
valorVenda real,
valorCompra real,
lote int
);

CREATE TABLE cliente (
cod int primary key,
nome varchar(35),
email varchar(45),
telefone int,
obs varchar(45),
endereco int,
CPF_CNPJ int,
foreign key (endereco) references endereco(cod)
);

create table tbLivro(
cod int primary key,
capa char (15),
autor int,
foreign key (autor) references autor(cod),
editora int,
foreign key (editora) references editora(cod),
ISBN varchar (13),
paginas int,
subtitulo varchar (50),
estoque int,
foreign key (estoque) references estoque(cod),
/*
quantidade int,
valorVenda real,
valorCompra real,
*/
idioma int,
foreign key (idioma) references idioma(cod),
genero int,
foreign key (genero) references genero(cod),
anoLancamento date
);

create table tbCompra(
cod int primary key,
entrega varchar (500),
foreign key (entrega) references entrega(cod),
hora time,
dataCompra date,
quantidade int,
livro int,
foreign key (livro) references tbLivro(cod),
cliente int,
foreign key (cliente) references cliente(cod)

);