const express = require("express");
const router = express.Router();
const Account = require("../models/Account");

router.get('/', function(request, response){
  response.send('Poop');
})

module.exports = router;
