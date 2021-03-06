const express = require("express");
const router = express.Router();
const Snippet = require("../models/Snippet");

router.get('/', function(request, response){ // shows all snippets on the main page
  Snippet.find()
  .then(function(allSnips){
    var temp = [];
    for (var i = 0; i < allSnips.length; i++) {
      temp.push(decodeURI(allSnips[i].body));
    }
    return response.render('index',{
      allSnips: allSnips,
      decodedBody: temp
    });
  })
})

router.get('/snippet/:id', function(request, response){
  Snippet.findOne({
    _id: request.params.id
  })
  .then(function(specificSnip){
    for (var i = 0; i < specificSnip.tags.length; i++) {
      console.log(specificSnip.tags[i]);
    }
    response.render('snippet',{
      specificSnip: specificSnip
    })
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
  var standardName = (request.body.name).toLowerCase().trim().split(',');
  var standardBody = encodeURI(request.body.body);
  var standardTitle = (request.body.title).trim();
  var standardNotes = (request.body.notes).trim(); // trim just removes any spaces before and after the string's content.

  console.log('Element 0: ' + standardName[0], 'Element 1: ' + standardName[1]);

  const snippet = new Snippet();
  snippet.title = standardTitle;
  snippet.body = standardBody; // need some kind of validation so the user can input actual code without it breaking everything...
  snippet.notes = standardNotes;
  snippet.language = standardLanguage;
  // for (var i = 0; i < snippet.tags.length; i++) {
  //   snippet.tags[i].name = standardName[i];
  // }
  snippet.save()
  .then(function(newSnip){
    response.json(newSnip);
  })
})

module.exports = router;
