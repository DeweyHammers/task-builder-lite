class Task {
  static all = {}

  constructor(json) {
    this.id = json.id;
    this.title = json.title;
    this.description = json.description;
    this.items = Item.createItemsFromJson(json.items, this);
    Task.all[this.id] = this
  }

  static get all() {
    return all
  }

  static createTasksFromJson(json) {
    for(const [key, value] of Object.entries(json)) {
      new Task(value);
    }
  }

  static create(title, description) {
    fetch('http://127.0.0.1:3000/tasks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    })
    .then(res => res.json())
    .then(json => {
      const task = new Task({id: json.id, title: title, description: description, items: {}});
      renderTask(task);
    })
    .catch(err => console.error(err));
  }

  delete() {
    fetch(`http://127.0.0.1:3000/tasks/${this.id}`, {
      method: 'DELETE'
    })
    .catch(err => alert(err));
  }
}