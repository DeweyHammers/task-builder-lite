class Application {
  constructor(allTasks) {
    this.tasks = allTasks
  }

  execute() {
    const form = document.querySelector('#new-task-form');
    EventCalls.handleTaskForm(form, this);
    this.renderAllTasks();
  }

  renderAllTasks() {
    for(const [key, task] of Object.entries(this.tasks)) {
      CreateHtml.allTasks(task, this);
    }
  }

  renderTask(id) {
    const task = this.tasks[id];
    CreateHtml.task(task, this);
  }

  renderAllItems(items, task) {
    for(const [key, item] of Object.entries(items)) {
      CreateHtml.item(item, task);
    };
  }
  
  removeAllChildNodes(parent) {
    while(parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}