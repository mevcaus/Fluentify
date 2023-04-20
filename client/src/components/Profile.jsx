import React from 'react';
import { Card, Container, CardImg, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css"

const Profile = () => {
  const user = useSelector(state => state.user);
  const quizzes = useSelector(state => state.quizzes);
  const learnings = useSelector(state => state.learnings);
  const quizzesComplete = Object.values(quizzes).reduce((count, quiz) => count + (quiz ? 1 : 0), 0);
  const learningsComplete = Object.values(learnings).reduce((count, learning) => count + (learning ? 1 : 0), 0);
  console.log(user);
  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap'}}>
      <Col>
        <Card style={{ width: '80%' }}>
          <Card.Img style={{ width: '100%' }} variant='top' src={user.userPhotoURL}/>
          <Card.Body>
            <Card.Title>{user.userDisplayName}</Card.Title>
            <Card.Text>{user.userEmail}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Row>
          <Card style={{ width: '80%' }}>
            <Card.Body>
              <Card.Title>Number of Quizzes completed: {quizzesComplete}</Card.Title>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <Card style={{ width: '80%' }}>
            <Card.Body>
              <Card.Title>Number of Learnings completed: {learningsComplete}</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Col>
    </Container>
  )
};

export default Profile;
