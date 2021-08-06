class Task {
  static all = {}

  constructor(json) {
    this.id = json.id;
    this.title = json.title;
    this.description = json.description;
    this.items = Item.createItemsFromJson(json.items, this);
    this.renderTask()
    Task.all[this.id] = this
  }

  static get all() {
    return all
  }

  static createTasksFromJson(json) {
    json.forEach(task => {
      new Task(task);
    });
  }

  renderTask() {
    tasksUl.classList.add('border');
    const li = document.createElement('li');
    li.className = 'mb-3 mt-3';
    li.innerHTML = taskHtml(this);
    tasksUl.appendChild(li);
    li.querySelector('button').onclick = () => this.renderShowTask();
  }

  renderShowTask() {
    tasksUl.classList.add('border');
    removeAllChildNodes(tasksUl);
    const li = document.createElement('li');
    li.className = 'mb-3 mt-3';
    li.innerHTML = taskShowHtml(this);
    tasksUl.appendChild(li);
    this.items.forEach(item => item.renderItem());
    const button = document.createElement('button');
    button.innerText = 'Make Cry';
    tasksUl.appendChild(button);
    button.addEventListener('click', () => {
      Item.create('Make Cry', this);
    });
    document.querySelector('#buttonBack').onclick = () => Task.renderAllTasks();
    document.querySelector('#buttonDelete').onclick = () => this.delete();
    document.querySelector('#item-form').addEventListener('submit', event => {
      event.preventDefault();
      const text = document.querySelector('#text');
      if (!event.target.checkValidity()) {
        event.stopPropagation();
        event.target.classList.add('was-validated');
      } else {
        event.target.classList.remove('was-validated');
        Item.create(text.value, this);
        text.value = '';
      }
    });
  }

  static renderAllTasks() {
    removeAllChildNodes(tasksUl);
    for(const key in Task.all) {
      Task.all[key].renderTask();
    }
  }

  static handleNewTaskForm() {
    document.querySelector('#new-task-form').addEventListener('submit', event => {
      event.preventDefault();
      const title = document.querySelector('#title');
      const description = document.querySelector('#description');
      if (!event.target.checkValidity()) {
        event.stopPropagation();
        event.target.classList.add('was-validated');
      } else {
        event.target.classList.remove('was-validated');
        Task.create(title.value, description.value);
        title.value = '';
        description.value = '';
      }
    });
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
      task.renderShowTask();
      alert('success', task.title, 'has been successfully created!');
    })
    .catch(err => alert('warning', 'Error', err));
  }

  delete() {
    fetch(`http://127.0.0.1:3000/tasks/${this.id}`, {
      method: 'DELETE'
    })
    .then(() => {
      delete Task.all[this.id];
      tasksUl.classList.remove('border');
      Task.renderAllTasks();
      alert('danger', this.title, 'has been successfully deleted!');
    })
    .catch(err => alert('warning','Error', err));
  }
}