import React, { useState } from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css"
import Learn from './Learn.jsx'
import Profile from './Profile.jsx'

const HomePage = () => {
  const [active, setActive] = useState('learn');
  const handleButtonClick = (button) => {
    setActive(button);
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Container style={{ display: 'flex', alignItems: 'left', justifyContent: 'space-between', width: '20%', margin: '0 0', height: '100vh', borderRight: '2px solid #D3D3D3', backgroundColor: 'rgb(120, 81, 169)' }}>
        <Nav style={{ width: '40%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-start'}}>
        <img
          alt="Logo"
          src={'./assets/Fluentify_1.png'}
          style={{ width: '100%', height: '13%', margin: '100px 10px 10px 70%'}}
        />
          <Button className={`${active === 'learn' ? 'homepage-button-learn active-button' : 'homepage-button-learn'}`} size='lg' onClick={() => handleButtonClick('learn')}>Learn</Button>
          <Button className={`${active === 'profile' ? 'homepage-button-profile active-button' : 'homepage-button-profile'}`} size='lg' onClick={() => handleButtonClick('profile')}>Profile</Button>
        </Nav>
      </Container>
      <Container style={{ backgroundColor: 'rgba(50,54,96,255)', maxWidth: '100%', display: 'flex', alignContent: 'center'}}>
        {active === 'learn' ?
        <Learn /> :
        <Profile />
        }
      </Container>
    </div>
  )
};

export default HomePage;
