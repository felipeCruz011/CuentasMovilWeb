import { getAddExpenseFormHtml } from './helper-functions.js';
import { getEditExpenseFormHtml } from './helper-functions.js';
import { createExpense, loadExpenses } from './expensesController.js';
import { showModal } from './modal.js';
import { getExpenseForEditByIndex } from './expensesController.js';

// Codigo para obtener el html de las diferentes vistas
let AddExpenseFormHtml;
let EditExpenseFormHtml;


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
  console.log('Se ejecuto 2');
  const addButton = document.getElementById('addButton');
  
  
  addButton.addEventListener('click', async () => {

    // Obtenemos el html correspondiente
    await getAddExpenseFormHtml().then(html => {
      AddExpenseFormHtml = html;
    });
  
    await showModal(AddExpenseFormHtml);
    await createExpense();
  });

  // Codigo para editar el gasto y abrir la ventana con los datos del gasto 
  
  const editButtons = document.querySelectorAll('.btn-edit-expense');
  
  editButtons.forEach(btn => {
    btn.addEventListener('click', async e => {
      // Obtenemos el Index del gasto que vamos a editar para que sea el Id que lo identifique
      const id = btn.parentElement.id;
      const index = Number(id.split('-')[1]);
      
      // Obtenemos el html de la vista
      await getEditExpenseFormHtml().then(html => {
        EditExpenseFormHtml = html;
      });

      showModal(EditExpenseFormHtml);

      // Pasamos el index a la funcion que carga la informacion para editar el gasto en la ventana modal
      getExpenseForEditByIndex(index);
      
    });
  
  });
  

}













