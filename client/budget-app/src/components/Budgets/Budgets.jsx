import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Budgets.css';

export default function Budgets({ entries, reload, setReload}) {

  const [showEntry, setShowEntry] = useState(false);
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setShowEntry(false);
  const handleShow = () => setShowEntry(true);

  function handleEntry() {
    handleShow();
  }

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
    setTitle("");
    setBudget("");
  }

  function createEntry() {
    axios.post('http://localhost:3000/api/entry/', 
    {
      title: title,
      budget: budget
    },
    {
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`
      }
    }).then(() => {
      // Cause the useEffect in Dashboard.jsx to run again and reload the entries
      setReload(!reload);
    }).catch((error) => {
      console.log(error);
    });
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
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
          <Button className="budget-dashboard-button" onClick={handleDashboard}>Dashboard</Button>
          <Button className="budget-add-button" onClick={handleEntry}>Add Entry</Button>
        </div>
      </Container>

      <Modal show={showEntry} onHide={handleClose} centered>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Budget Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="entryTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      required
                      type="text" 
                      placeholder="Food"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)} 
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a title.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="entryAmount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      required 
                      type="text" 
                      placeholder="200"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter an amount.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Entry
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}