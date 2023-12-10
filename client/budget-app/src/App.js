import 'bootstrap/dist/css/bootstrap.min.css';
// import Configure from "./components/Configure/Configure";
// import Dashboard from "./components/Dashboard/Dashboard";
// import Home from "./components/Home/Home";
// import Register from "./components/Register/Register";
import Container from "react-bootstrap/Container";
import Navibar from "./components/Navibar/Navibar";
import Home from './components/Home/Home';
import { useState } from 'react';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Container fluid className="app-container">
        <Navibar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      </Container>
    </div>
  );
}

export default App;
