var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs'); // Módulo para ler arquivos do sistema

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Configurações de view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Definindo rotas padrão
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Função para gerar rotas automáticas com base nos arquivos da pasta views
function generateRoutesFromViews() {
  const viewsDir = path.join(__dirname, 'views');
  
  fs.readdir(viewsDir, (err, files) => {
    if (err) {
      console.error('Erro ao ler a pasta views:', err);
      return;
    }
    
    files.forEach(file => {
      const routeName = `/${file.replace('.ejs', '')}`;
      const viewName = file.replace('.ejs', '');
      
      app.get(routeName, (req, res) => {
        res.render(viewName); 
      });
      
      console.log(`Rota criada: ${routeName}`);
    });
  });
}

// Gera as rotas automaticamente
generateRoutesFromViews();

// Captura de erros 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manipulador de erros
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
