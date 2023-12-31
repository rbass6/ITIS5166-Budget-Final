import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import { useState, useEffect } from 'react';
import './DashboardHome.css';

export default function DashboardHome({entries, expenses, selectedEntry, setSelectedEntry}) {
  const [selectedEntryName, setSelectedEntryName] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getEntryName(entries, selectedEntry);
    getExpenseForMonth(expenses);
  }, [entries, selectedEntry, expenses])

  function handleBudget() {
   navigate('/dashboard/budget')
  }

  function handleExpenses() {
    navigate('/dashboard/expense')
  }

  function transformEntries(entries) {
    let transformedEntries = []
    transformedEntries.push(["Budget Entry", "Amount"])
    entries.forEach((entry) => {
      transformedEntries.push([entry.title, entry.budget])
    })
    return transformedEntries
  }

  function getExpenseForMonth(expenses) {

    if (expenses.length !== 0) {
      expenses.forEach((expense) => {
        console.log("expense year", expense.year)
        console.log("expense month", expense.month)
        console.log("current year", new Date().getFullYear())
        console.log("current month", new Date().getMonth())
        if (expense.year === new Date().getFullYear() && expense.month === new Date().getMonth()) {
          console.log("expense amount", expense.amount)
          setMonthlyExpense(expense.amount)
        }
      })
    }
  }

  function getBudgetTotal(entries) {
    let totalBudget = 0
    entries.forEach((entry) => {
      if (entry._id === selectedEntry) {
        totalBudget = entry.budget;
      }
    });
    return totalBudget;
  }

  function getEntryName(entries, selectedEntry) {
    let foundEntry = entries.find((entry) => entry._id === selectedEntry);
    if (foundEntry === undefined || foundEntry.title === undefined) {
      setSelectedEntryName("");
      return;
    }
    setSelectedEntryName(foundEntry.title);
  }

  function getMixedData(entries, expenses, selectedEntry) {
    let data = []
    data.push(["Month", "Expenses", "Budget"])

    entries.forEach((entry) => {
      if (entry._id === selectedEntry) {
        expenses.forEach((expense) => {
          if (expense.entryId === selectedEntry) {
            data.push([expense.month + 1 + "/" + expense.year, expense.amount, entry.budget])
          }
        })
      }
    })

    data.sort((a, b) => {

      let aMonth = parseInt(a[0].split("/")[0])
      let bMonth = parseInt(b[0].split("/")[0])

      if (aMonth < bMonth) {
        return 1
      }
      if (aMonth > bMonth) {
        return -1
      }
      return 0
    });

    return data
  }

  function isMultipleExpenses(expenses, selectedEntry) {
    let count = 0
    expenses.forEach((expense) => {
      if (expense.entryId === selectedEntry) {
        count += 1
      }
    })
    if (count > 1) {
      return true
    }
    return false
  }

  return (
    <div className="dashboard">
      <Container className="dashboard-container">
        <h1>Dashboard</h1>
        {
          entries.length === 0
          ?
          <>
            <i className="bi bi-cash-coin" title="Cash & coin"></i>
            <h3>It looks like you don't have a budget set up. Create one here.</h3>
            <Button aria-label="Budget" className="dashboard-budget-button" onClick={handleBudget}>Budget</Button>              
          </>
          :
          expenses.length === 0
          ?
          <>
            <i className="bi bi-cash-coin" title="Cash & coin"></i>
            <h3>It looks like you don't have any expenses set up. Add them here.</h3>
            <Button aria-label="Expenses" className="dashboard-expenses-button" onClick={handleExpenses}>Expenses</Button>       
          </>
          :
          <>
            <Row>
              <Col className="budget-entry-col">
                <Form.Label>Select Budget Entry</Form.Label>
                <Form.Select
                  aria-label="Select Budget Entry"
                  value={selectedEntry}
                  onChange={(e) => setSelectedEntry(e.target.value)}
                  size="lg"
                  className="budget-select"
                >
                  {
                    entries.map((entry) => (
                      <option key={entry._id} value={entry._id}>{entry.title} - ${entry.budget}</option>
                    ))
                  }
                </Form.Select>
              </Col>
            </Row>
            <Row className="chart-top-row">
              <Col>
                <h4>Budget Overview</h4>
                <div className="piechart-container">
                  <Chart
                    chartType="PieChart"
                    data={transformEntries(entries)}
                    width="100%"
                    height="300px"
                    legendToggle
                    className="pie-chart"
                    options={{
                      width: "50%",
                      height: 350,
                      is3D: true
                    }}
                  />
                </div>
              </Col>
              {
                monthlyExpense > 0 ? (
                  <Col>
                  <h4>{selectedEntryName} Expenses for {new Date().getMonth() + 1}/{new Date().getFullYear()}</h4>
                  <div className="gauge-container">
                    <Chart 
                      chartType="Gauge"
                      data={[["Budget Total", "Amount"], [selectedEntryName, monthlyExpense / getBudgetTotal(entries) * 100]]}
                      width="100%"
                      height="250px"
                      className="gauge-chart"
                      options={{
                        width: "50%",
                        height: 250,
                        redFrom: 90,
                        redTo: 100,
                        yellowFrom: 75,
                        yellowTo: 90,
                        minorTicks: 5,
                      }}
                    />
                  </div>
                </Col>
                ) : (
                  <Col>
                    <h4>No expense added for this month. Add one to see a chart for expenses this month.</h4>
                  </Col>
                )
              }

            </Row>
            <Row className="chart-bottom-row">
              <Col>
                <h4>{selectedEntryName} Expenses</h4>
                <div className="combo-container">
                  {
                    isMultipleExpenses(expenses, selectedEntry) ? (
                      <Chart 
                        chartType="ComboChart"
                        data={getMixedData(entries, expenses, selectedEntry)}
                        width="100%"
                        height="400px"
                        className="combo-chart"
                        options={{
                          vAxis: { title: "Amount" },
                          hAxis: { title: "Month" },
                          seriesType: "bars",
                          series: { 1: { type: "line" } }
                        }}
                        lineWidth={5}
                      />
                    ) : (
                      <h5>Only one expense for this entry. Add more expenses to see a chart.</h5>
                    )
                  }

                </div>
              </Col>
            </Row>
            
          </>
        }
      </Container>
    </div>
  )
}