const express = require("express");
const router = express.Router();
const Account = require("../models/Account");

router.get('/users', function(request, response){
  Account.find()
  .then(function(allUsers){
    response.json(allUsers);
  })
})

module.exports = router;
