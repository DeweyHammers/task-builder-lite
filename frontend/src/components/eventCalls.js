class EventCalls {
  static handleGoToTask(button, application, task_id) {
    button.addEventListener('click', () => {
      const ul = document.querySelector('#tasks');
      application.removeAllChildNodes(ul);
      application.renderTask(task_id);
    });
  }

  static handleBackButton(button, application) {
    button.addEventListener('click', () => {
      const ul = document.querySelector('#tasks');
      application.removeAllChildNodes(ul);
      application.renderAllTasks();
    });
  }

  static handleTaskForm(form, application) {
    form.addEventListener('submit' , (event) =>{
      event.preventDefault();
      const title = document.querySelector('#title');
      const description = document.querySelector('#description');
      FetchCalls.createNewTask(title.value, description.value, application);
      title.value = '';
      description.value = '';
    });
  }

  static handleDeleteTaskButton(button, application, task_id) {
    button.addEventListener('click', () => {
      FetchCalls.deleteTask(application, task_id);
    });
  }

  static handleDoneButton(button, item) {
    button.addEventListener('click', () => {
      FetchCalls.updateItemStatus(item);
    });
  }

  static handleItemForm(form, task) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = document.querySelector('#item');
      FetchCalls.createNewItem(input.value, task);
      input.value = '';
    })
  }

  static handleRemoveItemButton(button, task, item, ul, li) {
    button.addEventListener('click', () => {
      FetchCalls.removeItem(task, item, ul, li);
    })
  }
}