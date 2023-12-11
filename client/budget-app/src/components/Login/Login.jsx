import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export default function Login({setLoggedIn}) {

  const [validated, setValidated] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  function handleRegister() {
    navigate('/register');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    setValidated(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    loginUser();
  }

  function loginUser() {
    axios.post('http://localhost:3000/api/login', {
      email: email,
      password: password
    }).then((response) => {
      const token = response.data;
      document.cookie = `token=${token}`;
      setLoggedIn(true);
      navigate('/dashboard')

    }).catch((error) => {
      console.log(error);
      setServerError("Error while logging in: " + error.response.data);
    });
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="login-server-error">
            <p>{serverError}</p>
          </div>

          <div className="login-button-group">
            <Button variant="secondary" type="button" onClick={handleRegister}>Register</Button>
            <Button variant="primary" type="submit">Submit</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}