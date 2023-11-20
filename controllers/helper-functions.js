
// Codigo para obtener la vista en html de Agregar Gastos
export async function getAddExpenseFormHtml() {
  const response = await fetch('./views/add-expense.html');
  return response.text();
}

// Codigo para obtener la vista en html de Editar Gastos
export async function getEditExpenseFormHtml() {
  const response = await fetch('./views/edit-expense.html');
  return response.text();
}