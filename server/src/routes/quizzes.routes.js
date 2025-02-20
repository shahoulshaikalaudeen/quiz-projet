const express = require('express');
const multer = require('multer');
const Quiz = require('../models/Quiz');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// Configuration Multer pour uploader des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

/**
 * @route   POST /api/quizzes
 * @desc    Créer un nouveau quiz
 * @access  Privé (authentification requise)
 */
router.post('/', isAuthenticated, upload.single('image'), async (req, res) => {
  try {
    const { titre, description, questions } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newQuiz = new Quiz({
      titre,
      description,
      image: imageUrl,
      auteur: req.user.id,
      questions: JSON.parse(questions),
    });

    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

/**
 * @route   GET /api/quizzes
 * @desc    Récupérer tous les quizzes
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('auteur', 'pseudo email');
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

/**
 * @route   GET /api/quizzes/:id
 * @desc    Récupérer un quiz par ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('auteur', 'pseudo email');
    if (!quiz) return res.status(404).json({ message: 'Quiz non trouvé' });

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

/**
 * @route   PATCH /api/quizzes/:id
 * @desc    Modifier un quiz (seulement par l'auteur)
 * @access  Privé
 */
router.patch('/:id', isAuthenticated, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz non trouvé' });

    if (quiz.auteur.toString() !== req.user.id)
      return res.status(403).json({ message: 'Accès refusé' });

    Object.assign(quiz, req.body);
    await quiz.save();

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

/**
 * @route   DELETE /api/quizzes/:id
 * @desc    Supprimer un quiz (seulement par l'auteur)
 * @access  Privé
 */
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz non trouvé' });

    if (quiz.auteur.toString() !== req.user.id)
      return res.status(403).json({ message: 'Accès refusé' });

    await quiz.deleteOne();
    res.status(200).json({ message: 'Quiz supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

module.exports = router;
