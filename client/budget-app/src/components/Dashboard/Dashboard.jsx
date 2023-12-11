import Budget from '../Budget/Budget';
import Expense from '../Expense/Expense';
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
  const [expenses, setExpenses] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [reloadEntries, setReloadEntries] = useState(false);
  const [reloadExpenses, setReloadExpenses] = useState(false);

  // Get entries
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
  }, [reloadEntries]);

  // Get expenses from selected entry
  useEffect(() => {
    if (selectedEntry.length > 0) {
      axios.get('http://localhost:3000/api/expenses/' + selectedEntry, {
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`
        }
      }).then((response) => {
        console.log(response.data)
        setExpenses(response.data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [reloadEntries, selectedEntry]);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  return (
    <div className="dashboard-budget-container">
      <Routes>
        <Route path="/" element={<DashboardHome/>} />
        <Route path="/budget" element={
          <Budget 
            entries={entries} 
            reloadEntries={reloadEntries} 
            setReloadEntries={setReloadEntries}
          />
        }/>
        <Route path="/expense" element={
          <Expense 
            selectedEntry={selectedEntry} 
            setSelectedEntry={setSelectedEntry} 
            expenses={expenses}
            entries={entries}
            reloadExpenses={reloadExpenses} 
            setReloadExpenses={setReloadExpenses}/>
        }/>
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