/* eslint-disable no-case-declarations */
/* eslint-disable import/prefer-default-export */
/* eslint-disable default-param-last */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
const scripts = require('./scripts');

const initialState = {
  isLoggedin: false,
  user: {
    userUid: null,
    userDisplayName: '',
    userPhotoURL: '',
    userEmail: '',
  },
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

const rootReducer = (state = initialState, action) => {
  const { learnings, quizzes } = state;
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: {
          userUid: action.payload.uid,
          userDisplayName: action.payload.displayName,
          userPhotoURL: action.payload.userPhotoURL,
          userEmail: action.payload.email,
        },
        isLoggedIn: action.payload.isLoggedIn,
      };
    case 'QUIZINFO':
      return {
        ...state,
        quizzes: action.payload.quizzes,
        learnings: action.payload.learnings,
      };
    case 'COMPLETEDLEARNING':
      const updatedLearnings = {
        ...learnings,
        [`learning${action.payload.index}`]: true,
      };
      scripts.putLearning(state.user.userUid, updatedLearnings);
      return {
        ...state,
        learnings: updatedLearnings,
      };
    case 'COMPLETEDQUIZ':
      const updatedQuizzes = {
        ...quizzes,
        [`quiz${action.payload.index}`]: true,
      };
      scripts.putQuiz(state.user.userUid, updatedQuizzes);
      return {
        ...state,
        quizzes: updatedQuizzes,
      };
    default:
      return state;
  }
};

export default rootReducer;
