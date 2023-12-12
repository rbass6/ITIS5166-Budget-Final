import Container from 'react-bootstrap/Container';
import Navibar from '../Navibar/Navibar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Outlet } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Home.css';

export default function Home({loggedIn, setLoggedIn, showLogoutWarning, setShowLogoutWarning, setWarningShown, reset}) {

  const navigate = useNavigate();
  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
  const [showIntro, setShowIntro] = useState(true);

  function handleClose() {
    setShowLogoutWarning(false);
    setWarningShown(true);
  }

  function handleLogin() {
    setShowIntro(false);
    navigate('/login');
  }

  function handleRegister() {
    setShowIntro(false);
    navigate('/register');
  }

  function handleStayLoggedIn() {
    axios.post(`${url}/api/refresh/`, {}, {
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`
      }
    }).then((response) => {
      const token = response.data;
      document.cookie = `token=${token}`;
      setShowLogoutWarning(false);
      setWarningShown(false);
      reset();
    }).catch((error) => {
      console.log(error);
    });
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  return (
    <div className="home">
      <Container fluid className="app-container">
        <Navibar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        {
          !loggedIn && showIntro && (
            <div className="home-default">
              <i class="bi bi-wallet2" title="Wallet"></i>
              <h3>Budget BFF</h3>
              <h4><i>"Your best friend for budgeting!"</i></h4>
              <div className="home-button-container">
                <Button aria-label="Login" variant="primary" className="home-login-button" onClick={handleLogin}>Login</Button>
                <Button aria-label="Register" variant="primary" className="home-register-button" onClick={handleRegister}>Register</Button>
              </div>
            </div>
          )
        }
        <Outlet />
      </Container>
      <Modal show={showLogoutWarning} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>You will be logged out in 20 seconds.</Modal.Body>
        <Modal.Footer>
          <Button aria-label="Close" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button aria-label="Stay Logged In" variant="primary" onClick={handleStayLoggedIn}>
            Stay Logged In
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}