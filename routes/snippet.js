const express = require("express");
const router = express.Router();
const Snippet = require("../models/Snippet");

router.get('/', function(request, response){ // shows all snippets on the main page
  Snippet.find()
  .then(function(allSnips){
    var temp = [];
    for (var i = 0; i < allSnips.length; i++) {
      temp.push(decodeURI(allSnips[i].body)); // FIXME: this decodes the body before displaying. Still not working correctly with Mustache file. Fix later.
    }
    return response.render('index',{
      allSnips: allSnips,
      decodedBody: temp
    });
  })
})

router.get('/language/:language', function(request, response){ // shows all snippets of the selected language only
  Snippet.find({
    language: request.params.language
  })
  .then(function(showByLanguage){
    response.render('index',{
      allSnips: showByLanguage
    })
  })
})

router.get('/tag/:tag', function(request, response){
  Snippet.find({
    'tags.name': request.params.tag
  })
  .then(function(showByTag){
    response.render('index',{
      allSnips: showByTag
    })
  })
})

router.get('/api/allSnippet', function(request, response){ // shows all snippets and displays as JSON for API purposes
  Snippet.find()
  .then(function(allSnips){
    response.json(allSnips);
  })
})

router.get('/newSnippet', function(request, response){
  response.render('newSnippet');
})

router.post('/newSnippet', function(request, response){ // creates a new snippet and saves it to the DB
  var standardLanguage = (request.body.language).toLowerCase().trim();
  var standardName = (request.body.name).toLowerCase().trim();
  var standardBody = encodeURI(request.body.body);
  var standardTitle = (request.body.title).trim();
  var standardNotes = (request.body.notes).trim(); // trim just removes any spaces before and after the string's content.

  const snippet = new Snippet();
  snippet.title = standardTitle;
  snippet.body = standardBody; // need some kind of validation so the user can input actual code without it breaking everything...
  snippet.notes = standardNotes;
  snippet.language = standardLanguage;
  snippet.tags.push({name: standardName});
  snippet.save()
  .then(function(newSnip){
    response.json(newSnip);
  })
})

module.exports = router;
