let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
const list = document.getElementById("expense-list");
const totalEl = document.getElementById("total");

function renderExpenses() {
  list.innerHTML = "";
  let total = 0;

  expenses.forEach((exp, index) => {
    total += exp.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${exp.category} - ${exp.date}</span>
      <strong>₹${exp.amount}</strong>
    `;

    list.appendChild(li);
  });

  totalEl.innerText = `₹${total}`;
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

document.getElementById("expense-form").addEventListener("submit", e => {
  e.preventDefault();

  const amount = Number(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  expenses.push({ amount, category, date });
  renderExpenses();
  e.target.reset();
});

renderExpenses();
