const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: { type: Number, required: true }, // Utilisation d'un entier pour _id
  username: { type: String, required: true },
  email: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);
module.exports = User;