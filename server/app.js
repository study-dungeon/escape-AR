// modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jwt-simple');
// const env = require('dotenv');

// instantiate express
const app = express();

// dotenv file config
// env.config();

// data models
const { User } = require('./db').models;

// routes
const apiUser = require('./api/users');
const apiTeam = require('./api/teams');
const apiCaptain = require('./api/captains');
const apiGame = require('./api/games');
const apiAuth = require('./api/auth');

// ### MIDDLEWARE ###
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api routes
app.use('/api/users', apiUser);
app.use('/api/teams', apiTeam);
app.use('/api/captains', apiCaptain);
app.use('/api/games', apiGame);
app.use('/api/auth', apiAuth);

// static resources
app.use(express.static('public'));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/lib', express.static(path.join(__dirname, '..', 'lib')));
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// token
app.use((req, res, next) => {
  const token = req.headers.authorization;

  if(!token) {
    return next();
  }

  let id;
  try {
    id = jwt.decode(token, process.env.JWT_SECRET).id;
    User.findById(id)
      .then(user => {
        if(!user) {
          return next({ status: 401 })
        }

        req.user = user;
        next();
      })
      .catch(error => next(error))
  }
  catch(error) {
    next({ status: 401 })
  }
})

// grab files
const index = path.join(__dirname, '..', 'public', 'index.html');
const pageNotFound = path.join(__dirname, '..', 'public', '404.html');

// ### MAIN ROUTES ###
app.get('/', (req, res, next) => {
  res.sendFile(index);
});

// ### ERROR HANDLING ###
app.use((req, res, next) => {
  res.status(404).sendFile(pageNotFound);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).send('<h1>There was an Error<h1>');
});

module.exports = app;
