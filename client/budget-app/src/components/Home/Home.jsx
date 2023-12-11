import Container from 'react-bootstrap/Container';
import Navibar from '../Navibar/Navibar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Outlet } from "react-router-dom"
import axios from 'axios';
import './Home.css';

export default function Home({loggedIn, setLoggedIn, showLogoutWarning, setShowLogoutWarning, setWarningShown, reset}) {

  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

  function handleClose() {
    setShowLogoutWarning(false);
    setWarningShown(true);
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
        <Outlet />
      </Container>
      <Modal show={showLogoutWarning} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>You will be logged out in 20 seconds.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStayLoggedIn}>
            Stay Logged In
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}