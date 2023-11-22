// views/AddExpenseView.js

import { ExpensesView } from "./ExpensesView.js";
import { Expense } from "../models/Expense.js";

class AddExpenseView {
  constructor() {}

  async openForm(modalInfo) {
    return ExpensesView.renderForm(modalInfo.html).then(({ element }) => {
      this.showModal(element);
    });
  }

  async showModal(element) {
    await document.body.appendChild(element);

    // Event Listener para cerrar cuando se da click por fuera del modal
    const modalContent = document.getElementById('modalContent');
    modalContent.addEventListener("click", (e) => {
      if (e.target == modalContent) {
        modalContent.parentElement.remove();
      }
    });
  }

  
}

// Exportamos la clase
export { AddExpenseView };
