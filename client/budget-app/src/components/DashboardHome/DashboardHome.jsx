import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import './DashboardHome.css';

export default function DashboardHome({entries, expenses}) {
  const navigate = useNavigate();

  function handleBudget() {
   navigate('/dashboard/budget')
  }

  function handleExpenses() {
    navigate('/dashboard/expense')
  }

  return (
    <div className="dashboard">
      <Container className="dashboard-container">
        <h1>Dashboard</h1>
        {
          entries.length === 0
          ?
          <>
            <i className="bi bi-cash-coin"></i>
            <h3>It looks like you don't have a budget set up. Create one here.</h3>
            <Button className="dashboard-budget-button" onClick={handleBudget}>Budget</Button>              
          </>
          :
          expenses.length === 0
          ?
          <>
            <i className="bi bi-cash-coin"></i>
            <h3>It looks like you don't have any expenses set up. Add them here.</h3>
            <Button className="dashboard-expenses-button" onClick={handleExpenses}>Expenses</Button>       
          </>
          :
          <>
            <i className="bi bi-cash-coin"></i>
            <h3>Charts</h3>
          </>
        }
      </Container>
    </div>
  )
}