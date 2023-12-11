import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import './Expense.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default function Expense({ selectedEntry, setSelectedEntry, expenses, entries, reloadEntries, setReloadEntries }) {

  const [showExpense, setExpense] = useState(false);
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [serverError, setServerError] = useState("");
  const [loadFirstEntry, setLoadFirstEntry] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => setExpense(false);
  const handleShow = () => setExpense(true);

  // Set selected entry to first entry in list
  useEffect(() => {
    if(loadFirstEntry && entries.length > 0){
      setSelectedEntry(entries[0]._id)
      setLoadFirstEntry(false)
    }
  }, [entries, setSelectedEntry, loadFirstEntry])

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

    createExpense();
  }

  function createExpense() {

    axios.post('http://localhost:3000/api/expense/', 
    {
      amount: amount,
      year: startDate.getFullYear(),
      month: startDate.getMonth(),
      entry_id: selectedEntry
    },
    {
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`
      }
    }).then(() => {
        handleClose();
        setValidated(false);
        setTimeout(1000);
        setStartDate(new Date());
        setAmount("");
        setServerError("");
        setReloadEntries(!reloadEntries);
    }).catch((error) => {
      console.log(error.response.data);
      setServerError("Error while adding expense: " + error.response.data);
    });
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  function getEntryFromExpense(expense) {
    const foundEntry = entries.find((entry) => entry._id === expense.entryId);

    if (foundEntry === undefined) {
      return "Entry not found";
    }
    
    return foundEntry.title;
  }

  return (
    <div className="expense">
      <Container className="expense-container">
        <Form>
          <h1>Expense</h1>
          <Row>
            <Col>
              <Form.Select
                aria-label="Select Expense Entry"
                value={selectedEntry}
                onChange={(e) => setSelectedEntry(e.target.value)}
                size="lg"
                className="expense-select"
              >
                {
                  entries.map((entry) => (
                    <option key={entry._id} value={entry._id}>{entry.title}</option>
                  ))
                }
              </Form.Select>
            </Col>
          </Row>
          <Row>
          <Col className="title-col">
              <h3>Budget Entry</h3>
            </Col>
            <Col className="amount-col">
              <h3>Expense Amount</h3>
            </Col>
            <Col className="date-col">
              <h3>Expense Date</h3>
            </Col>
          </Row>
          <hr/>
          {
            expenses.map((expense) => (
              <div key={expense._id}>
                <Row>
                  <Col>
                    <h4>{getEntryFromExpense(expense)}</h4>
                  </Col>
                  <Col>
                    <h4>${expense.amount}</h4>
                  </Col>
                  <Col>
                    <h4>{expense.month + 1}/{expense.year}</h4>
                  </Col>
                </Row>
                <hr/>
              </div>
            ))
          }
          <div className="expense-button-container">
            <Button className="expense-dashboard-button" onClick={handleDashboard}>Dashboard</Button>
            <Button className="expense-add-button" onClick={handleShow}>Add Entry</Button>
          </div>
        </Form>
      </Container>

      <Modal show={showExpense} onHide={handleClose} centered>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Expense Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="expenseEntry">
                    <Form.Label>Select Budget Entry</Form.Label>
                    <Form.Select 
                      aria-label="Select Budget Entry"
                      value={selectedEntry}
                      onChange={(e) => setSelectedEntry(e.target.value)}
                    >
                      {
                        entries.map((entry) => (
                          <option key={entry._id} value={entry._id}>{entry.title}</option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="expenseCalendar">
                    <Form.Label>Calendar</Form.Label>
                    <DatePicker
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      onChange={(date) => setStartDate(date)} 
                      selected={startDate}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="expenseAmount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      required 
                      type="text" 
                      placeholder="200"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter an amount.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <div className="expense-server-error">
                <p>{serverError}</p>
              </div>
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