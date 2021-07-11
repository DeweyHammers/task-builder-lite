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

  renderAllItems(items, ul) {
    items.forEach(item => {
      CreateHtml.allItems(item, ul);
    });
  }
  
  removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}