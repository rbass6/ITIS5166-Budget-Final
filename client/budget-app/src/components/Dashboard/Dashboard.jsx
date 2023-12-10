import Budgets from '../Budgets/Budgets';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './Dashboard.css';
import { useState } from 'react';

export default function Dashboard() {

  const [showBudgets, setShowBudgets] = useState(false);

  function handleBudgets() {
    setShowBudgets(true);
  }

  return (
    <div className="dashboard-budgets-container">
      { showBudgets ? (
        <Budgets setShowBudgets={setShowBudgets}/>
      ) : (
        <div className="dashboard">
          <Container className="dashboard-container">
            <h1>Dashboard</h1>
            <i class="bi bi-cash-coin"></i>
            <h3>It looks like you don't have a budget set up. Add them here.</h3>
            <Button className="dashboard-budget-button" onClick={handleBudgets}>Budgets</Button>
          </Container>
        </div>
      )}
    </div>
  );
}