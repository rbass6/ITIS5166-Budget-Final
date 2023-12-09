import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.css';
import { useState } from 'react';

export default function Login({setLoggedIn, setShowRegister}) {

  const [validated, setValidated] = useState(false); 

  function handleRegister() {
    setShowRegister(true);
  }

  function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }

  return (
    <div className="login">
      <Container className="w-50">
        <h1>Login</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              required
              type="email"
              placeholder="Enter email" 
            />
            <Form.Control.Feedback type="invalid">
              Please enter an email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              required
              type="password" 
              placeholder="Password" 
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="login-button-group">
            <Button variant="secondary" type="button" onClick={handleRegister}>Register</Button>
            <Button variant="primary" type="submit">Submit</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}