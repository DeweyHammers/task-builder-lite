class Task {
  constructor(json) {
    this.id = json.id;
    this.title = json.title;
    this.description = json.description;
    this.items = Item.createItemsFromJson(json.items);
  }

  static createTasksFromJson(json) {
    const allTasks = {};
    for(const [key, value] of Object.entries(json)) {
      const task = new Task(value);
      allTasks[key] = task;
    }
    return allTasks;
  }
}