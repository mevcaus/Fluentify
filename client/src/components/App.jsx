import React from 'react';
import { useSelector } from 'react-redux';
import LandingPage from './LandingPage.jsx';
import HomePage from './HomePage.jsx';
const App = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  return (
    <div>
      {isLoggedIn ? <HomePage /> : <LandingPage />}
      {/* <HomePage /> */}
    </div>
  )
}

export default App