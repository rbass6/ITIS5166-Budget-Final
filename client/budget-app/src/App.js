import 'bootstrap/dist/css/bootstrap.min.css';
// import Configure from "./components/Configure/Configure";
// import Dashboard from "./components/Dashboard/Dashboard";
// import Home from "./components/Home/Home";
// import Register from "./components/Register/Register";
import Container from "react-bootstrap/Container";
import Navibar from "./components/Navibar/Navibar";
import Login from "./components/Login/Login";


function App() {
  return (
    <div className="App">
      <Container fluid className="app-container">
        <Navibar />
        <Login />
      </Container>
    </div>
  );
}

export default App;
