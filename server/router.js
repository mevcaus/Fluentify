const router = require('express').Router();

const quizController = require('./controllers/quizController');

router.get('/quiz/:id', quizController.getQuiz);
router.get('/learning/:id', quizController.getLearning);
router.get('/completedInfo/:uid', quizController.getCompletedInfo);
router.put('/completedLearning/:uid', quizController.finishLearning);
router.put('/completedQuiz/:uid', quizController.finishQuiz);

module.exports = router;
