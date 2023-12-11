import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navibar.css';

export default function Navibar({loggedIn, setLoggedIn}) {

  const navigate = useNavigate();

 function handleLogout() {
    document.cookie = "token=null"
    setLoggedIn(false);
    navigate('/login');
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
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  <Link className="nav-link" to="/dashboard/budget">Budget</Link>
                  <Link className="nav-link" to="/dashboard/expense">Expenses</Link>
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