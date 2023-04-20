import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const Learn = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector(state => state.quizzes);
  const learnings = useSelector(state => state.learnings);
  const uid = useSelector(state => state.user.userUid)
  const [showModal, setShowModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [clickedIndex, setClickedIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:3000/completedInfo/${uid}`)
      .then(res => {
        console.log(res);
        useDispatch({
          type: 'QUIZINFO',
          payload: {
            quizzes: res.data.quizzes,
            learnings: res.data.learnings,
          }
        })
      })
      console.log(learnings);
  }, [])
  const quizModalOptionClick = (answer) => {
    setSelectedAnswer(answer)
  }
  const learnButtonClick = (index) => {
    setClickedIndex(index);
    axios.get(`http://localhost:3000/learning/${index}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setShowModal(true);
      })
      .catch(err => {
        console.error('err fetching learning\n', err)
      })
  }
  const quizButtonClick = (index) => {
    setClickedIndex(index);
    axios.get(`http://localhost:3000/quiz/${index}`)
      .then(res => {
        setTitle(res.data.title);
        setAnswers(res.data.answers);
        setCorrect(res.data.correct);
        setQuestions(res.data.questions);
        setShowQuizModal(true);
      })
      .catch(err => {
        console.error('err fetching learning\n', err)
      })
  }
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  }
  const finishedLearningClick = (e) => {
    e.preventDefault();
    setShowModal(false);
    console.log('this is the learning i clicked:', clickedIndex);
    dispatch({
      type: 'COMPLETEDLEARNING',
      payload: {
        index: clickedIndex,
      },
    })
  }

  const finishedQuizClick = () => {
    if (selectedAnswer !== correct) {
      return;
    }
    setShowModal(false);
    setSubmitted(true);
    dispatch({
      type: 'COMPLETEDQUIZ',
      payload: {
        index: clickedIndex,
      },
    });
    const updatedQuizzes = useSelector(state => state.quizzes);
    axios.put(`http://localhost:3000/completedQuiz/${uid}`, updatedQuizzes)
      .then(res => {
        console.log('put quiz update to server');
      })
      .catch(err => {
        console.error(err);
      })
  }
  return (
    <div className='d-flex align-items-strech flex-wrap mx-3 my-5' style={{ overflowX: 'auto' }}>
      {Object.keys(quizzes).map((quiz, index) => (
        <div className="col-md-4 mb-3 mr-3" key={quiz}>
          <Card className='h-75 p-5'>
            <Card.Body >
              <div>
                <Card.Img src={`./assets/lesson${index + 1}.png`}/>
              </div>
              <div className='d-flex flex-row mr-3 ml-0 justify-content-between'>
                <Card.Title>{learnings[index]}</Card.Title>
                <Button className="mr-2 mb-2 learn-button" onClick={()=> learnButtonClick(index + 1)}>Learning {index + 1}</Button>
                {learnings[`learning${index + 1}`] && <Button className="mb-2 quiz-button" onClick={()=> quizButtonClick(index + 1)}>Quiz {index + 1}</Button>}
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
      <Modal show={showModal} onHide={()=> setShowModal(false)} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => finishedLearningClick(e)}>Got it!</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showQuizModal} onHide={()=> setShowQuizModal(false)} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{questions}</Modal.Body>
        <Modal.Body>{answers.map((answer, index) => (
          <li key={index}>
            <button
              type='radio'
              onClick={() => handleAnswerClick(answer)}
              disabled={submitted}
              className={submitted && (answer === selectedAnswer ? 'btn btn-success' : 'btn btn-danger') + (answer === correct ? ' correct-answer' : '')}
              value={answer}
            >
              {answer}
            </button>
          </li>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => finishedQuizClick(e)}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
};

export default Learn;
