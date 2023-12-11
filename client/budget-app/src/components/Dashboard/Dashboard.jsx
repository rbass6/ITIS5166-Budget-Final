import Budget from '../Budget/Budget';
import Expense from '../Expense/Expense';
import DashboardHome from '../DashboardHome/DashboardHome';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import './Dashboard.css';

export default function Dashboard({loggedIn}) {
  
  const [entries, setEntries] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [reloadEntries, setReloadEntries] = useState(false);
  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

  // Get entries
  useEffect(() => {
    axios.get(`${url}/api/entries/`, {
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`
      }
    }).then((response) => {
      setEntries(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [reloadEntries, url]);

  // Get expenses from selected entry
  useEffect(() => {
    if (selectedEntry.length > 0) {
      axios.get(`${url}/api/expenses/` + selectedEntry, {
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`
        }
      }).then((response) => {
        setExpenses(response.data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [reloadEntries, selectedEntry, url]);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  return (
    <div className="dashboard-budget-container">
      <Routes>
        <Route path="/" element={<DashboardHome entries={entries} expenses={expenses}/>} />
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
            reloadEntries={reloadEntries} 
            setReloadEntries={setReloadEntries}/>
        }/>
      </Routes>
    </div>
  );
}

