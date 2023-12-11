import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Expense.css';

export default function Expense() {

  const [showExpense, setExpense] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setExpense(false);
  const handleShow = () => setExpense(true);

  function handleDashboard() {
    navigate("/dashboard")
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    
    setValidated(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    createEntry();

    handleClose();
    setValidated(false);
    setTimeout(1000);
    // setTitle("");
    // setBudget("");
  }

  function createEntry() {

  }

  return (
    <div className="expense">
      <Container className="expense-container">
        <h1>Expense</h1>
        <Row className="expense-label-row">
          <Col className="category-col">
            <h3>Expense Category</h3>
          </Col>
          <Col className="amount-col">
            <h3>Expense Amount</h3>
          </Col>
        </Row>
        <hr/>
        <div className="expense-button-container">
          <Button className="expense-dashboard-button" onClick={handleDashboard}>Dashboard</Button>
          <Button className="expense-add-button" onClick={handleShow}>Add Entry</Button>
        </div>
      </Container>

      <Modal show={showExpense} onHide={handleClose} centered>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Expense Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="expenseCalendar">
                    <Form.Label>Calendar</Form.Label>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="expenseAmount">
                    <Form.Label>Amount</Form.Label>
                  </Form.Group>
                </Col>
              </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Expense
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}