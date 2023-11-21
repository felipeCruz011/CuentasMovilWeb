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

  showModal(element) {
    document.body.appendChild(element);
  }

  
}

// Exportamos la clase
export { AddExpenseView };
