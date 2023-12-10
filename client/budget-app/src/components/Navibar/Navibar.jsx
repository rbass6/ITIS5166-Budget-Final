import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navibar.css';

export default function Navibar({loggedIn, setLoggedIn}) {

 function handleLogout() {
    document.cookie = "token=null"
    setLoggedIn(false);
 }
  
  return (
    <div className="navibar">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
          <i className="bi bi-piggy-bank-fill"></i>
            BudgetBFF
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            {
              loggedIn ? (
                <Nav className="me-auto">
                  <Nav.Link>Dashboard</Nav.Link>
                  <Nav.Link>Expenses</Nav.Link>
                </Nav>
              ) : (
                <i>
                  Please log in.
                </i>
              )
            }

          </Navbar.Collapse>
          {
            loggedIn && (
              <Navbar.Collapse className="justify-content-end">
                <Button onClick={handleLogout}>Log out</Button>
              </Navbar.Collapse>
            )
          }
        </Container>
      </Navbar>
    </div>
  );
}