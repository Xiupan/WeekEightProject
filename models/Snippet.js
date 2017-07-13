// a title
// a body (the code)
// optional notes
// a language
// tags -- that is, user-defined words or phrases that classify the code, like "authentication", "front-end", "middleware", or "database".

const mongoose = require("mongoose");
const snippetSchema = new mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: false},
  notes: {type: String, required: false},
  language: {type: String, required: true},
  tags: [
    {
      name: {type: String, required: false}
    }
  ]
})

const Snippet = mongoose.model('Snippet', snippetSchema);
module.exports = Snippet;
