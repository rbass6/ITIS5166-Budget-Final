import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login";
import {
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);
  const [warningShown, setWarningShown] = useState(false);
  const navigate = useNavigate();
  const {
    totalSeconds,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  // Logic for showing logout warning
  useEffect(() => {
    if (loggedIn && !warningShown && totalSeconds >= 40) {
      setShowLogoutWarning(true);
      setWarningShown(true);
    }

    if (loggedIn && warningShown && totalSeconds >= 60) {
      setShowLogoutWarning(false);
      setWarningShown(false);
      document.cookie = "token=null"
      setLoggedIn(false);
      navigate('/login')
    }
  }, [loggedIn, totalSeconds, warningShown, navigate, reset, pause]);

  // Logic for starting and stopping timer
  useEffect(() => {
    if (loggedIn && !isRunning) {
      start();
    } else if (!loggedIn && isRunning) {
      setWarningShown(false);
      reset();
    }
  }, [loggedIn, start, reset, pause, isRunning]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <Home 
            loggedIn={loggedIn} 
            setLoggedIn={setLoggedIn} 
            showLogoutWarning={showLogoutWarning} 
            setShowLogoutWarning={setShowLogoutWarning} 
            setWarningShown={setWarningShown}
            reset={reset}
          />}>
          <Route 
            path="dashboard/*" 
            element={
            <RequireAuth loggedIn={loggedIn} >
              <Dashboard loggedIn={loggedIn} />
            </RequireAuth>
            } 
          />
          <Route path="login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
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
