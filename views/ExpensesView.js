// views/ExpensesView.js

class ExpensesView {
  constructor() {
    this.expensesContainer = document.getElementById("expensesContainer");
  }

  static renderForm(modalHtml) {
    // Vista del formulario para agregar

    return fetch(modalHtml)
      .then((res) => res.text())
      .then((html) => {
        // Crear nodo
        const modal = document.createElement("div");
        modal.classList.add("modal-container");
        modal.id = "modalContainer";

        modal.innerHTML = html;

        // Devolver objeto con info
        return {
          element: modal,
        };
      });
  }

  render(expenses) {
    let html = "";

    html += `
          <div id="expensesTable">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Valor</th>  
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
        `;

    expenses.forEach((expense) => {
      html += `
        <tr>
          <td>${expense.id}</td>
          <td>${expense.name}</td>  
          <td>$${expense.amount}</td>
          <td>${expense.date}</td>
          <td class="btn-edit-expense"><i class="fas fa-edit"></i></td>
          <td class="btn-delete-expense"><i class="fas fa-trash"></i></td>  
        </tr>
        `;
    });

    this.expensesContainer.innerHTML = html;

    // Funcion para guardar un gasto
    function handleSubmit(e) {
      e.preventDefault();

      const name = form.querySelector("#expense-name").value;
      const amount = form.querySelector("#expense-amount").value;

      ExpensesModel.addExpense(name, amount);
    }
  }
}

// Exportamos la clase
export { ExpensesView };
