import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

export default function Register({setLoggedIn}) {

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '138.197.112.207';

  function handleRegister() {
    navigate('/login');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    setValidated(true);

    if (password1 !== password2 || form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    registerUser();
  }

  function registerUser() {
    axios.post(`${url}/api/register/`, {
      email: email,
      username: username,
      password: password1
    }).then((response) => {
      const token = response.data;
      document.cookie = `token=${token}`;
      setLoggedIn(true);
      navigate('/dashboard')
    }).catch((error) => {
      console.log(error);
      setServerError("Error while registering: " + error.response.data);
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

          <div className="register-server-error">
            <p>{serverError}</p>
          </div>

          <div className="register-button-group">
            <Button variant="secondary" type="button" onClick={handleRegister}>Login</Button>
            <Button variant="primary" type="submit">Submit</Button>
          </div>

        </Form>
      </Container>
    </div>
  );
}