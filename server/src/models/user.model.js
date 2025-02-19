const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Veuillez entrer un email valide']
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  description: {
    type: String, 
    maxlength: 500, 
    default: '', 
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);

