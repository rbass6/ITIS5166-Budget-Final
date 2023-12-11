import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './components/Home/Home';
import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
          <Route 
            path="dashboard/*" 
            element={
            <RequireAuth loggedIn={loggedIn} >
              <Dashboard loggedIn={loggedIn} />
            </RequireAuth>
            } 
          />
          <Route path="login" element={<Login setLoggedIn={setLoggedIn}/>} />
          <Route path="register" element={<Register setLoggedIn={setLoggedIn}/>} />
        </Route>
      </Routes>
    </div>
  );
}

function RequireAuth({ loggedIn, children }) {

  if (!loggedIn) {
    return <Navigate to="/login"/>;
  }

  return children;
}

export default App;
