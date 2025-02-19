const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/usersDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB connecté avec succès.');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error);
    process.exit(1);
  }
};

module.exports = connectDB;
