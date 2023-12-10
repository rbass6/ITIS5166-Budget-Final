import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Budgets.css';

export default function Budgets({setShowBudgets, entries}) {

  function handleEntry() {
    
  }

  function handleDashboard() {
    setShowBudgets(false);
  }

  return (
    <div className="budgets">
      <Container className="budgets-container">
        <h1>Budgets</h1>
        <Row className="budgets-label-row">
          <Col className="category-col">
            <h3>Budget Category</h3>
          </Col>
          <Col className="amount-col">
            <h3>Budget Amount</h3>
          </Col>
        </Row>
        <hr/>
        {
          entries.map((entry) => (
            <div key={entry._id}>
              <Row>
                <Col>
                  <h4>{entry.title}</h4>
                </Col>
                <Col>
                  <h4>${entry.budget}</h4>
                </Col>
              </Row>
              <hr/>
            </div>
          ))
        }
        <div className="budgets-button-container">
          <Button className="budget-add-button" onClick={handleEntry}>Add Entry</Button>
          <Button className="budget-dashboard-button" onClick={handleDashboard}>Dashboard</Button>
        </div>
        
      </Container>
    </div>
  );
}