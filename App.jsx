import React, { useState } from "react";
import './App.css';

function App() {
  // States to store income, expenses, and budget
  const [income, setIncome] = useState(0);
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  // Handle adding an expense
  const handleAddExpense = () => {
    if (!expenseName || !expenseAmount || isNaN(expenseAmount)) {
      alert("Please enter valid data");
      return;
    }

    const newExpense = {
      name: expenseName,
      amount: parseFloat(expenseAmount),
      id: Math.random().toString(36).substr(2, 9), // Generate unique ID
    };

    setExpenses([...expenses, newExpense]); // Add new expense
    setExpenseName(""); // Reset inputs
    setExpenseAmount("");
  };

  // Handle deleting an expense
  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses); // Remove expense from list
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  // Calculate the remaining budget
  const remainingBudget = budget - totalExpenses;

  // Determine if the user is over or under budget
  const budgetStatus = remainingBudget < 0 ? "Over Budget" : "Under Budget";

  return (
    <div className="App">
      <h1>Budget Tracker</h1>

      {/* Budget Input Section */}
      <div className="budget-section">
        <input
          type="number"
          placeholder="Set Budget"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value))}
        />
      </div>

      {/* Income Input Section */}
      <div className="income-section">
        <input
          type="number"
          placeholder="Set Income"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value))}
        />
      </div>

      <h2>Income: ${income.toFixed(2)}</h2>
      <h2>Budget: ${budget.toFixed(2)}</h2>
      <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
      <h2>Remaining Budget: ${remainingBudget.toFixed(2)}</h2>
      <h3>Status: {budgetStatus}</h3>

      {/* Expense Input Section */}
      <div className="expense-section">
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)} // Update name
        />
        <input
          type="number"
          placeholder="Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)} // Update amount
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      {/* Expense List */}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.name} - ${expense.amount.toFixed(2)}{" "}
            <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;