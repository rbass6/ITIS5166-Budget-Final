import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navibar.css';

export default function Navibar({loggedIn}) {
  return (
    <div className="navibar">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
          <i class="bi bi-piggy-bank-fill"></i>
            BudgetBFF
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {
              loggedIn ? (
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="#expenses">Expenses</Nav.Link>
                </Nav>
              ) : (
                <i>
                  Please log in.
                </i>
              )
            }

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}