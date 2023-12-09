import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import axios from 'axios';
import './Register.css';

export default function Register({setLoggedIn, setShowRegister}) {

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  function handleRegister() {
    setShowRegister(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    if (password1 !== password2 || form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    setValidated(true);
    
    registerUser();
  }

  function registerUser() {
    axios.post('http://localhost:3000/api/register', {
      email: email,
      username: username,
      password: password1
    })
    .then((response) => {
      const token = response.data;
      console.log(token);
      document.cookie = `token=${token}`;
      setLoggedIn(true);
    })
    .catch((error) => {
      console.log(error);
    });
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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