// models/ExpenseRepository.js

import { Expense } from "./Expense.js";

// Definimos la clase ExpenseRepository
class ExpenseRepository {
  constructor() {
    // Inicializamos la base de datos 
    this.initDb();
    // Obtenemos los gastos del storage
    this.expenses = this.getAllFromStorage();
  }

  // Funcion para Inicializar la db en caso que no este creada
  async initDb() {
    if (JSON.parse(localStorage.getItem("expenses")) == null) {
      let expenses = [];

      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
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

  getExpenseById(id) {
    // Iteramos sobre el Array para encontrar el mismo id de nuestra peticion
    return this.expenses.find((expense) => Number(expense.id) === Number(id));
  }

  saveExpense(expense) {
    // Agregamos el Id mediante Index del Array expenses
    if (this.expenses.length > 0) {
      if (this.expenses.length == 1) {
        expense.id = this.expenses.length;
      } else {
        expense.id = this.expenses.length;
      }
    }

    // Agregar nuevo gasto
    this.expenses.unshift(expense);

    // Stringificar datos
    let expensesJson = JSON.stringify(this.expenses);

    // Guardar en storage
    localStorage.setItem("expenses", expensesJson);
  }

  // Guardar Edicion de Gasto
  async updateExpense(expense) {
    // Convertir objeto de la promesa a arreglo
    

    // Buscar indice del gasto a actualizar
    for (let i = 0; i < this.expenses.length; i++) {
      if (this.expenses[i].id == expense.id) {
        // Actualizar gasto existente
        this.expenses[i] = expense;
        break;
      }
    }
    
    // Guardamos con los cambios ya hechos
    localStorage.setItem("expenses", JSON.stringify(this.expenses));
  }
}

// Exportamos la clase
export { ExpenseRepository };
