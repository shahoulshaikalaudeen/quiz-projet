const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],  
  bonneReponse: { type: String, required: true }  
});

const quizSchema = new mongoose.Schema({
  titre: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: { type: String }, 
  auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  questions: [questionSchema], 
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
