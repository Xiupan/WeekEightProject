const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true}
})

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
