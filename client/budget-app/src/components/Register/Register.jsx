import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Register.css';

export default function Register({setLoggedIn, setShowRegister}) {

  function handleRegister() {
    setShowRegister(false);
  }

  return (
    <div className="register">
      <Container className="w-50">
        <h1>Register</h1>
        <Form.Group className="mb-3" controlId="registerEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword2">
          <Form.Label>Re-enter password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <div className="register-button-group">
          <Button variant="secondary" type="button" onClick={handleRegister}>Login</Button>
          <Button variant="primary" type="submit">Submit</Button>
        </div>

      </Container>
    </div>
  );
}