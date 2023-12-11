import './Home.css';
import Container from 'react-bootstrap/Container';
import Navibar from '../Navibar/Navibar';
import { Outlet } from "react-router-dom"

export default function Home({loggedIn, setLoggedIn}) {

  return (
    <div className="home">
      <Container fluid className="app-container">
        <Navibar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Outlet />
      </Container>
    </div>
  );
}