const axios = require('axios');

module.exports = {
  putLearning: (uid, learnings) => {
    axios.put(`http://localhost:3000/completedLearning/${uid}`, learnings);
  },
  putQuiz: (uid, quizzes) => {
    axios.put(`http://localhost:3000/completedQuiz/${uid}`, quizzes);
  },
  get: async (uid) => {
    let state;
    await axios.get(`http://localhost:3000/completedInfo/${uid}`)
      .then((res) => {
        state = res.data;
      })
      .catch((err) => {
        throw err;
      });
    return state;
  },
};
