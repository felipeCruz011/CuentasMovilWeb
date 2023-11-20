// Codigo para obtener la vista en html de Agregar Gastos
export async function showAddExpenseFormHtml() {
  const response = await fetch("./views/add-expense.html");
  return response.text();
}

// Codigo para obtener la vista en html de Editar Gastos
export async function showEditExpenseFormHtml() {
  const response = await fetch("./views/edit-expense.html");
  return response.text();
}

// Codigo que obtiene la vista html del Cuadro de confirmacion de eliminacion de gasto
export async function showDeleteConfirmationHtml() {
  const response = await fetch("./views/delete-expense.html");
  return response.text();
}
