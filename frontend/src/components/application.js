class Application {
  constructor(allTasks) {
    this.tasks = allTasks
  }

  execute() {
    this.renderAllTasks()
  }

  renderAllTasks() {
    for(const [key, task] of Object.entries(this.tasks)) {
      CreateHtml.allTasks(task, this);
    }
  }

  renderTask(id) {
    const task = this.tasks[id];
    CreateHtml.task(task, this)
  }

  renderAllItems(items, task, ul) {
    for(const [key, item] of Object.entries(items)) {
      CreateHtml.item(item, task, ul);
    };
  }
  
  removeAllChildNodes(parent) {
    while(parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}