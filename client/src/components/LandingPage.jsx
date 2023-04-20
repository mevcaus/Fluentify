import React from 'react';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { googleSignup } from './firebaseconfig';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
export default function LandingPage() {
  const dispatch = useDispatch();
  const userLogin = () => {
    googleSignup()
      .then(user => {
        dispatch({
          type: 'LOGIN',
          payload: {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            userPhotoURL: user.photoURL,
            isLoggedIn: true
          }
        })
        return user.uid;
      })
      .then((uid) => {
        axios.get(`http://localhost:3000/completedInfo/${uid}`)
          .then((res) => {
            console.log('this is my res.data', res.data);
            dispatch({
              type: 'QUIZINFO',
              payload: {
                quizzes: res.data.quizzes,
                learnings: res.data.learnings
              }
            })
          })
      })
      .catch(err => {
        console.error(err);
      })
  }
  return (
    <div style={{ backgroundColor: 'rgb(120, 81, 169)' }}>
      <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '80%', margin: '0 auto', height: '100vh' }}>
        <div style={{ width: '60%', display: 'flex', justifyContent: 'center' }}>
          <img
            alt="Logo"
            src={'./assets/Fluentify_1.png'}
            style={{ width: '80%', height: '80%', margin: '10px 20% 10px 10px'}}
          />
        </div>
        <Nav style={{ width: '40%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Button size='lg' style={{ width: '50%', margin: '10px 10px 10px 20%', backgroundColor: 'rgba(50,54,96,255)', fontSize: '25px', padding: '5% 10%', border: 'none', outline: 'none'}} onClick={userLogin}>Sign Up</Button>
          <Button size='lg' style={{ width: '50%', margin: '10px 10px 10px 20%', backgroundColor: 'rgba(252,206,34,255)', color: 'rgba(50,54,96,255)', fontSize: '25px', padding: '5% 10%'}} onClick={userLogin}>Login</Button>
        </Nav>
      </Container>
    </div>
  );
}