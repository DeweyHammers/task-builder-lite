class EventCalls {
  static handleGoToTask(button, ul, application, id) {
    button.addEventListener('click', () => {
      application.removeAllChildNodes(ul);
      application.renderTask(id);
    });
  }

  static handleBackButton(button, ul, application) {
    button.addEventListener('click', () => {
      application.removeAllChildNodes(ul);
      application.renderAllTasks();
    });
  }

  static handleDoneButton(button, item, p) {
    button.addEventListener('click', () => {
      FetchCalls.updateItemStatus(item, p);
    });
  }

  static handleItemForm(form, task, ul) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = document.querySelector('#item');
      FetchCalls.createNewItem(input.value, task, ul);
      input.value = '';
    })
  }

  static handleRemoveItemButton(button, task, item, ul, li) {
    button.addEventListener('click', () => {
      FetchCalls.removeItem(task, item, ul, li);
    })
  }
}