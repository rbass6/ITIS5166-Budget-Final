import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.css';

export default function Login({setLoggedIn, setShowRegister}) {

  function handleRegister() {
    setShowRegister(true);
  }

  return (
    <div className="login">
      <Container className="w-50">
        <h1>Login</h1>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <div className="login-button-group">
          <Button variant="secondary" type="button" onClick={handleRegister}>Register</Button>
          <Button variant="primary" type="submit">Submit</Button>
        </div>

      </Container>
    </div>
  );
}