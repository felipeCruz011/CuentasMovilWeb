// controllers/AppController.js

import { ExpenseRepository } from "../models/ExpenseRepository.js";
import { Expense } from "../models/Expense.js";
import { ExpensesView } from "../views/ExpensesView.js";
import { AddExpenseView } from "../views/AddExpenseView.js";

class AppController {
  constructor() {
    this.repository = new ExpenseRepository();
    this.expensesView = new ExpensesView();
    this.addExpenseView = new AddExpenseView();
    this.view = null;
    this.editingExpense = null;
  }

  async init() {
    // Se agrega a la propiedad la clase ExpensesView
    this.view = new ExpensesView();
    // se cargan los gastos
    await this.loadExpenses();
    // Se cargan los EventListeners
    await this.addEventListeners();
  }

  async loadExpenses() {
    let expenses = await this.getExpenses();
    this.renderExpensesView(expenses);
  }

  async getExpenses() {
    let rawExpenses = await this.repository.getAll();
    return rawExpenses.map(
      (expense) =>
        new Expense(expense.id, expense.name, expense.amount, expense.date)
    );
  }

  renderExpensesView(expenses) {
    this.view.render(expenses);
  }

  async addEventListeners() {
    // Agregar listeners de eventos

    // Listener para abrir la ventana Modal con la Interfax de Agregar un Gasto
    const addButton = document.getElementById("addButton");
    addButton.addEventListener("click", () => {
      // Pasamos la ruta para la vista
      const modalInfo = {
        html: "views/add-expense.html",
        onClose: () => {},
      };
      // Enviamos a renderizar
      this.handleModal(modalInfo);
    });

    // Listener para abrir la ventana Modal para editar un gasto
    const editButtons = document.querySelectorAll(".btn-edit-expense");

    editButtons.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        // Obtenemos el Index del gasto que vamos a editar para que sea el Id que lo identifique
        const id = btn.parentElement.children[0].textContent;

        //obtener el gasto a editar del repositorio usando el id
        const expense = await this.repository.getExpenseById(id);

        // Pasamos el gasto a editar a una propiedad de la clase para no pasarlo por las funciones
        this.editingExpense = expense;

        // Pasamos la ruta para la vista
        const modalInfo = {
          html: "views/edit-expense.html",
          onClose: () => {},
        };

        // Enviamos a renderizar primero el formulario
        await this.handleModal(modalInfo);
        this.addExpenseForEdit(expense);
      });
    });
  }

  async handleModal(modalInfo) {
    // Lógica para agregar gasto
    await this.addExpenseView.openForm(modalInfo);
    await this.handleFormSubmit();
  }

  // Funcion para agregar el gasto en el formulario de edicion de gasto
  async addExpenseForEdit(expense) {
    // Rellenar los datos en los inputs
    const name = document.getElementById("name");
    const amount = document.getElementById("amount");
    const date = document.getElementById("date");

    name.value = expense.name;
    amount.value = expense.amount;
    date.value = expense.date;
  }

  // Controllar evento Submit al guardar los datos del furmlario
  async handleFormSubmit() {
    const form = document.getElementById("expense-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Eventos para guardar un gasto
      const btnExpenseSave = document.getElementById("btnExpenseSave");
      if (btnExpenseSave) {
        // Obtenemos los datos del formulario
        const idFromTable = 0;
        const expense = this.getExpenseFromForm(idFromTable);

        // Guardamos el Gasto Nuevo
        this.repository.saveExpense(expense);

        // Cerramos la ventana Modal
        const modalContainer = document.getElementById("modalContainer");
        modalContainer.remove();

        // Recargar tabla
        await this.loadExpenses();
        // Cargamos nuevamente los Eventos
        await this.addEventListeners();
      }

      // Eventos para Editar un gasto
      const btnEditExpenseSave = document.getElementById("btnEditExpenseSave");
      if (btnEditExpenseSave) {
        // Obtenemos los datos del formulario
        const idFromTable = this.editingExpense.id;
        const expense = this.getExpenseFromForm(idFromTable);

        // Actualizamos en la db
        this.repository.updateExpense(expense);

        // Cerramos la ventana Modal
        const modalContainer = document.getElementById("modalContainer");
        modalContainer.remove();

        // Recargar tabla
        await this.loadExpenses();
        // Cargamos nuevamente los Eventos
        await this.addEventListeners();
      }
    });
  }

  // Funcion para obtener datos antes de guardar o editar
  getExpenseFromForm(idFromTable) {
    const id = idFromTable;
    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    const expense = {
      id,
      name,
      amount: parseFloat(amount),
      date,
    };

    return expense;
  }
}

// Iniciar app
async function main() {
  const controller = new AppController();
  await controller.init();
}

main();
