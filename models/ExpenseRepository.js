// models/ExpenseRepository.js

import { Expense } from "./Expense.js";

// Definimos la clase ExpenseRepository
class ExpenseRepository {
  constructor() {
    // Obtenemos los gastos del storage
    this.expenses = this.getAllFromStorage();
  }

  // Método para obtener los gastos del storage
  getAllFromStorage() {
    // Leemos el array de gastos del storage
    let expenses = JSON.parse(localStorage.getItem("expenses"));

    // Mapeamos a instancias de Expense
    return expenses.map((expense) => {
      return new Expense(
        expense.id,
        expense.name,
        expense.amount,
        expense.date
      );
    });
  }

  // Método getAll expuesto
  getAll() {
    return this.expenses;
  }

  saveExpense(expense) {
    // Agregamos el Id mediante Index del Array expenses
    if (this.expenses.length > 0) {
      if (this.expenses.length == 1) {
        expense.id = this.expenses.length;
      } else {
        expense.id = this.expenses.length - 1;
      }
    }

    // Agregar nuevo gasto
    this.expenses.unshift(expense);

    // Stringificar datos
    let expensesJson = JSON.stringify(this.expenses);

    // Guardar en storage
    localStorage.setItem("expenses", expensesJson);
  }
}

// Exportamos la clase
export { ExpenseRepository };
