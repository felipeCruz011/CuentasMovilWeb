import { getExpenses, loadExpenseById, saveExpenseById } from './db.js';
import { saveExpense } from './db.js';




// Funcion para cargar los gatos en el Index.html
export function loadExpenses() {

    const expenses = getExpenses();

    const expensesContainer = document.getElementById('expensesContainer');
  
    let html = '';
  
    html += `
      <div id="expensesTable">
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Valor</th>
              <th>Fecha</th> 
            </tr>
          </thead>
          <tbody>
    `;
  
    expenses.forEach((expense , index) => {
      html += `
            <tr id="expense-${index}"> 
              <td>${expense.name}</td>
              <td>$${expense.amount}</td>
              <td>${expense.date}</td>
              <td class="btn-edit-expense"><i class="fas fa-edit"></i></td>
            </tr>
      `;
    });
  
    html += `
          </tbody>
        </table>
      </div>
    `;
  
    expensesContainer.innerHTML = html; 
}

// Funcion para crear un Gasto nuevo aqui se recopila la informacion y se guarda la informacion
//  en la base de datos llamando la funcion saveExpense del archivo db.js
export function createExpense(modal) {

    const submitButton = document.getElementById('submit-btn');

    if(submitButton) {

      submitButton.addEventListener('click', async (e) => {

        e.preventDefault(); 

        const name = document.getElementById('name').value;
        const amount = document.getElementById('amount').value;
        const date = document.getElementById('date').value;
      
        const expense = {
          name,
          amount: parseFloat(amount), 
          date
        };
        console.log(expense);
      
        await saveExpense(expense);
        modal.close();
      });
  
    }
}



// Funcion para cargar la Informacion del Gasto segun el Index o Id del Gasto a la Vista Modal de Editar
export function getExpenseForEditByIndex(index) {
    //Obtenemos el gasto por id 
    const expense = loadExpenseById(index);

    // Rellenar los datos en los inputs 
    const name = document.getElementById('name');
    const amount = document.getElementById('amount');
    const date = document.getElementById('date');

    name.value = expense.name;
    amount.value = expense.amount;
    date.value = expense.date; 

    // Esperamos a la edicion para guardar los cambios
    updateListenerExpense(index);
}

// Evento Listener para guardar los cambios al Editar
export function updateListenerExpense(index, modal) {
    const submitUpdateButton = document.getElementById('edit-btn');

    submitUpdateButton.addEventListener('click', async (e) => {
        
        e.preventDefault(); 

        const name = document.getElementById('name').value;
        const amount = document.getElementById('amount').value;
        const date = document.getElementById('date').value;
      
        const expense = {
          name,
          amount: parseFloat(amount), 
          date
        };
        console.log(expense);
        await saveExpenseById(expense, index);
        // Cerramos la ventana modal
        const modalContainer = document.getElementById('modalContainer');
        modalContainer.remove();
    
      });
}