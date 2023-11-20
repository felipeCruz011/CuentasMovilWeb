// Función para inicializar la base de datos
export function initDb() {

    if(!getExpenses().length) {
  
      let expenses = [];
  
      localStorage.setItem('expenses', JSON.stringify(expenses));
  
    }
  
  }

// Función para obtener los gastos guardados
export function getExpenses() {

    let expenses = localStorage.getItem('expenses');
  
    if(!expenses) {
      return [];
    }
  
    return JSON.parse(expenses);
  
}

  

// Función para guardar un gasto
export function saveExpense(expense) {

    let expenses = getExpenses();
  
    expenses.push(expense);
  
    localStorage.setItem('expenses', JSON.stringify(expenses));

}

// Funcion para encontrar un gasto  segun el Index del Array de LocalStorage
export function loadExpenseById(index) {
    
    // Obtener todos los gastos
    const expenses = getExpenses();

    // Buscar gasto con find
    const expense = expenses.find((exp, i) => {
        return i === index; 
    });
    
    // Validar resultado
    if(!expense) {
        throw new Error("Expense not found");
    }
    
    // Devolver gasto
    return expense;

}

// Funcion para guardar Cambios de un gasto por Id o Index
export function saveExpenseById(updateExpense, index) {

    let expenses = getExpenses();

    // Reemplazar el gasto por el index
    expenses[index] = updateExpense;  
    
    // Guardamos en la db LocalStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));

}
