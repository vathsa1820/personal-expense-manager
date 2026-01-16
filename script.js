let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let debts = JSON.parse(localStorage.getItem("debts")) || [];

const expenseList = document.getElementById("expense-list");
const totalEl = document.getElementById("total");
const debtList = document.getElementById("debt-list");

let chart;
const ctx = document.getElementById("expenseChart");

// ---------------- EXPENSES ----------------

function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;
  let categoryTotals = {};

  expenses.forEach((exp, index) => {
    total += exp.amount;

    categoryTotals[exp.category] =
      (categoryTotals[exp.category] || 0) + exp.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${exp.category} - ${exp.date}</span>
      <strong>₹${exp.amount}</strong>
      <button onclick="deleteExpense(${index})">✖</button>
    `;
    expenseList.appendChild(li);
  });

  totalEl.innerText = `₹${total}`;
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderChart(categoryTotals);
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

document.getElementById("expense-form").addEventListener("submit", e => {
  e.preventDefault();

  expenses.push({
    amount: Number(amount.value),
    category: category.value,
    date: date.value
  });

  renderExpenses();
  e.target.reset();
});

// ---------------- CHART ----------------

function renderChart(data) {
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: [
          "#7cff6b",
          "#4dd0e1",
          "#ffb74d",
          "#e57373",
          "#ba68c8"
        ]
      }]
    }
  });
}

// ---------------- DEBTS ----------------

function renderDebts() {
  debtList.innerHTML = "";
  debts.forEach(d => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${d.person} (${d.type})</span>
      <strong>₹${d.amount}</strong>
    `;
    debtList.appendChild(li);
  });

  localStorage.setItem("debts", JSON.stringify(debts));
}

document.getElementById("debt-form").addEventListener("submit", e => {
  e.preventDefault();

  debts.push({
    person: person.value,
    amount: Number(debtAmount.value),
    type: type.value
  });

  renderDebts();
  e.target.reset();
});

// INIT
renderExpenses();
renderDebts();
