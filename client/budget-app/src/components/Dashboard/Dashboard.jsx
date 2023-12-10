import Budgets from '../Budgets/Budgets';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './Dashboard.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {

  const [showBudgets, setShowBudgets] = useState(false);
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

  function handleBudgets() {
    setShowBudgets(true);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  return (
    <div className="dashboard-budgets-container">
      { showBudgets ? (
        <Budgets setShowBudgets={setShowBudgets} entries={entries} reload={reload} setReload={setReload}/>
      ) : (
        <div className="dashboard">
          <Container className="dashboard-container">
            <h1>Dashboard</h1>
            <i className="bi bi-cash-coin"></i>
            <h3>It looks like you don't have a budget set up. Add them here.</h3>
            <Button className="dashboard-budget-button" onClick={handleBudgets}>Budgets</Button>
          </Container>
        </div>
      )}
    </div>
  );
}