import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Register.css';
import { useState } from 'react';

export default function Register({setLoggedIn, setShowRegister}) {

  const [validated, setValidated] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  function handleRegister() {
    setShowRegister(false);
  }

  function handleSubmit(event) {
    const form = event.currentTarget;

    if (password1 !== password2 || form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    
  }

  return (
    <div className="register">
      <Container className="w-50">
        <h1>Register</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="registerEmail">
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

          <Form.Group className="mb-3" controlId="registerUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              required
              type="text" 
              placeholder="Enter username" 
            />
            <Form.Control.Feedback type="invalid">
              Please enter a username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="registerPassword1">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              required
              type="password" 
              placeholder="Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="registerPassword2">
            <Form.Label>Re-enter password</Form.Label>
            <Form.Control 
              required
              type="password" 
              placeholder="Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              isValid={password1 === password2 && validated}
              isInvalid={password1 !== password2 && validated}
            />
            <Form.Control.Feedback type="invalid">
              {
                password1 !== password2 ? (
                  "Passwords do not match."
                ) : (
                  "Please enter a password."
                )
              }
            </Form.Control.Feedback>
          </Form.Group>

          <div className="register-button-group">
            <Button variant="secondary" type="button" onClick={handleRegister}>Login</Button>
            <Button variant="primary" type="submit">Submit</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}