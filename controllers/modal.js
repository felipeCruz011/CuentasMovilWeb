import { initDb } from './db.js'
import { createExpense, updateListenerExpense } from './expensesController.js'


// Funcion para generar el modal y no repetir este codigo cada vez que se llame una vista
export function showModal(content) {

  const modal = new Modal();

  modal.setContent(content);

  modal.show();

}



class Modal {
  // Declaramos la propiedad
  modalElement; 
  content;
  index;

  constructor() {
    this.modalElement = null;
    this.content = null;
    this.index = null;
  }

  setContent(html) {
    this.content = html;
  }

  // Funcion para cargar un gasto segun 

  show() {
    console.log('se ejecuta show cuando doy click al boton');
    initDb(); // inicializa localStorage

    this.modalElement = document.createElement('div');

    // Agregar clase
    this.modalElement.classList.add('modal');

    // Agregar contenido al modal
    this.modalElement.innerHTML = this.content;

    // Agregar estilos de Bootstrap
    this.modalElement.classList.add('modal', 'fade', 'show')

    // Cerrar modal con boton de cierre
    //const closeBtn = this.modalElement.querySelector('.close');

    // Agregar al DOM
    this.modalElement.classList.add('modal-window'); // agregar clase
  
    this.modalElement.style.display = 'block';
    this.modalElement.style.position = 'absolute';
    this.modalElement.style.zIndex = 1000;
    
    this.modalElement.style.top = '50%';
    this.modalElement.style.left = '50%';
    this.modalElement.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(this.modalElement);

    // Cerrar el modal al dar click en la x 
    //closeBtn.addEventListener('click', () => {
    //  this.close();
    //});

    // Cerrar cuando se da click por fuera del modal
    this.modalElement.addEventListener('click', e => {
      if(e.target == this.modalElement) {
        this.close();
      }
    })

    // Funcion para pasar el modelo cuando se Agregue un Gasto
    const submitAddButton = document.getElementById('submit-btn');
    if(submitAddButton) {
      createExpense(this); 
    }



  }

  close() {
    this.modalElement.remove();
  }
}

export default Modal;