import { showAddExpenseFormHtml } from "./helper-functions.js";
import { showEditExpenseFormHtml } from "./helper-functions.js";
import { showDeleteConfirmationHtml } from "./helper-functions.js";
import { createExpense, loadExpenses } from "./expensesController.js";
import { confirmExpenseDeletion } from "./expensesController.js";
import { getExpenseForEditByIndex } from "./expensesController.js";

import { showModal } from "./modal.js";

// Codigo para obtener el html de las diferentes vistas
let AddExpenseFormHtml;
let EditExpenseFormHtml;
let DeleteExpenseFormHtml;

// Inizialiamos todo en orden

async function init() {
  // Codigo para cargar los gastos ya guardados
  loadExpenses();

  // Como no ha cargado los elementos al DOM agregamos los eventListener en esta funcion

  await EventsListener();
}

init();

async function EventsListener() {
  // Codigo para Abrir la ventana modal de Añadir gastos
  console.log("Se ejecuto 2");
  const addButton = document.getElementById("addButton");

  addButton.addEventListener("click", async () => {
    // Obtenemos el html correspondiente
    await showAddExpenseFormHtml().then((html) => {
      AddExpenseFormHtml = html;
    });

    await showModal(AddExpenseFormHtml);
    await createExpense();
  });

  // Funcion Listener para Editar un Gasto

  const editButtons = document.querySelectorAll(".btn-edit-expense");

  editButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      // Obtenemos el Index del gasto que vamos a editar para que sea el Id que lo identifique
      const id = btn.parentElement.id;
      const index = Number(id.split("-")[1]);

      // Obtenemos el html de la vista
      await showEditExpenseFormHtml().then((html) => {
        EditExpenseFormHtml = html;
      });

      showModal(EditExpenseFormHtml);

      // Pasamos el index a la funcion que carga la informacion para editar el gasto en la ventana modal
      getExpenseForEditByIndex(index);
    });
  });

  // Funcion Listener para eliminar un gasto
  const deleteButtons = document.querySelectorAll(".btn-delete-expense");

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      // Obtenemos el Index del gasto que vamos a editar para que sea el Id que lo identifique
      const id = btn.parentElement.id;
      const index = Number(id.split("-")[1]);

      // Obtenemos el html de la vista
      await showDeleteConfirmationHtml().then((html) => {
        DeleteExpenseFormHtml = html;
      });

      showModal(DeleteExpenseFormHtml);

      // Funcion que espera la respuesta de confirmacion
      confirmExpenseDeletion(index);
    });
  });
}
