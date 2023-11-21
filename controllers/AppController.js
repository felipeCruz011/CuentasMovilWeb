// controllers/AppController.js

import { ExpenseRepository } from "../models/ExpenseRepository.js";
import { ExpensesView } from "../views/ExpensesView.js";
import { AddExpenseView } from "../views/AddExpenseView.js";
import { Expense } from "../models/Expense.js";

class AppController {
  constructor() {
    this.repository = new ExpenseRepository();
    this.expensesView = new ExpensesView();
    this.addExpenseView = new AddExpenseView();
    this.view = null;
  }

  async init() {
    this.view = new ExpensesView();
    await this.loadExpenses();
    this.addEventListeners();
  }

  async loadExpenses() {
    let expenses = await this.getExpenses();
    this.renderExpensesView(expenses);
  }

  async getExpenses() {
    let rawExpenses = await this.repository.getAll();
    return rawExpenses.map(
      (expense) => new Expense(expense.id, expense.name, expense.amount, expense.date)
    );
  }

  renderExpensesView(expenses) {
    this.view.render(expenses);
  }

  addEventListeners() {
    // Agregar listeners de eventos

    // Listener para abrir la ventana Modal con la Interfax de Agregar un Gasto
    const addButton = document.getElementById("addButton");
    addButton.addEventListener("click", () => {
      const modalInfo = {
        html: "views/add-expense.html",
        onClose: () => {},
      };
      this.handleAddExpense(modalInfo);
    });
  }

  async handleAddExpense(modalInfo) {
    // Lógica para agregar gasto
    await this.addExpenseView.openForm(modalInfo);
    await this.handleSubmit();
  }

  // Controllar evento Submit al guardar los datos del furmlario
  async handleSubmit() {
    const form = document.getElementById("expense-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // evento para guardar un gasto
      const btnExpenseSave = document.getElementById("btnExpenseSave");
      if (btnExpenseSave) {
        const id = 0;
        const name = document.getElementById("name").value;
        const amount = document.getElementById("amount").value;
        const date = document.getElementById("date").value;

        const expense = {
          id,
          name,
          amount: parseFloat(amount),
          date,
        };

        this.repository.saveExpense(expense);
        // Cerramos la ventana Modal
        const modalContainer = document.getElementById("modalContainer");
        modalContainer.remove();
      }
    });
  }
}

// Iniciar app
async function main() {
  const controller = new AppController();
  await controller.init();
}

main();
