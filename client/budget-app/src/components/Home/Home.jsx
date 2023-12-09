import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import Register from "../Register/Register";
import './Home.css';
import { useState } from 'react';

export default function Home({loggedIn, setLoggedIn}) {

  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="home">
      {
        loggedIn ? (
          <Dashboard/>
        ) : (
          <>
            {
              showRegister ? (
                <Register setLoggedIn={setLoggedIn} setShowRegister={setShowRegister}/>
              ) : (
                <Login setLoggedIn={setLoggedIn} setShowRegister={setShowRegister}/>
              )
            }
          </>
        )
      }
    </div>
  );
}