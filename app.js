// CodeSnippet Model:

// a title
// a body (the code)
// optional notes
// a language
// tags -- that is, user-defined words or phrases that classify the code, like "authentication", "front-end", "middleware", or "database".

// have a comprehensive set of tests for all controllers and models
// have registration and login
// allow you to create a snippet
// allow you to see a list of all your snippets
// allow you to see a list of all your snippets for a specific language
// allow you to see a list of all your snippets for a specific tag
// allow you to look at an individual snippet
// have an API to allow for creating and viewing of snippets as listed above

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const expressSession = require('express-session');
const faker = require('faker');

const accountRoutes = require('./routes/account');
const snippetRoutes = require('./routes/snippet');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/codesnippetDB'); // need to be changed for Heroku

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(accountRoutes);
app.use(snippetRoutes);

const port = process.env.PORT || 3000;
app.listen(port, function(){ // Heroku ready
    console.log('Code Snippet App is running!');
});
