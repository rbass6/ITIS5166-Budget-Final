import Budget from '../Budget/Budget';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import './Dashboard.css';

export default function Dashboard({loggedIn}) {
  
  const [entries, setEntries] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/entries/', {
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`
      }
    }).then((response) => {
      setEntries(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [reload]);



  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  return (
    <div className="dashboard-budget-container">
      <Routes>
        <Route path="/" element={<DashboardHome/>} />
        <Route path="/budget" element={<Budget entries={entries} reload={reload} setReload={setReload}/>} />
      </Routes>
    </div>
  );
}

function DashboardHome() {
  const navigate = useNavigate();

  function handleBudget() {
   navigate('/dashboard/budget')
  }

  return (
    <div className="dashboard">
      <Container className="dashboard-container">
        <h1>Dashboard</h1>
        <i className="bi bi-cash-coin"></i>
        <h3>It looks like you don't have a budget set up. Add them here.</h3>
        <Button className="dashboard-budget-button" onClick={handleBudget}>Budget</Button>
      </Container>
    </div>
  )
}