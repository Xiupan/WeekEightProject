const express = require("express");
const router = express.Router();
const Snippet = require("../models/Snippet");

// title: {type: String, required: true},
// body: {type: String, required: false},
// notes: {type: String, required: false},
// language: {type: String, required: true},
// tags: [
//   {
//     name: {type: String, required: false}
//   }
// ]
// })

router.get('/', function(request, response){
  Snippet.find()
  .then(function(allSnips){
    response.render('index',{
      allSnips: allSnips
    });
  })
})

router.post('/api/newSnippet', function(request, response){
  const snippet = new Snippet();
  snippet.title = request.body.title;
  snippet.body = request.body.body;
  snippet.notes = request.body.notes;
  snippet.language = request.body.language;
  snippet.tags.push({name: request.body.name});
  snippet.save()
  .then(function(newSnip){
    response.json(newSnip);
  })
})

module.exports = router;
