const {
  doc, getDoc, setDoc, updateDoc,
} = require('firebase/firestore');
const db = require('../db');

module.exports = {
  getQuiz: (req, res) => {
    getDoc(doc(db, 'quizzes', `quiz${req.params.id}`))
      .then((info) => {
        res.json(info.data());
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  getLearning: (req, res) => {
    getDoc(doc(db, 'learnings', `learning${req.params.id}`))
      .then((info) => {
        res.json(info.data());
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  getCompletedInfo: (req, res) => {
    const defaultSendback = {
      learnings: {
        learning1: false,
        learning2: false,
        learning3: false,
      },
      quizzes: {
        quiz1: false,
        quiz2: false,
        quiz3: false,
      },
    };
    const docVar = doc(db, 'completedQuizzes', req.params.uid);
    getDoc(docVar)
      .then((info) => {
        if (info.exists()) {
          res.json(info.data());
        } else {
          setDoc(docVar, defaultSendback)
            .then(() => {
              res.json(defaultSendback);
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  finishLearning: (req, res) => {
    console.log('this is my console log', req.body);
    const docVar = doc(db, 'completedQuizzes', req.params.uid);
    updateDoc(docVar, { learnings: req.body })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  finishQuiz: (req, res) => {
    const docVar = doc(db, 'completedQuizzes', req.params.uid);
    updateDoc(docVar, { quizzes: req.body.quizzes })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
