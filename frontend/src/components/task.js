class Task {
  static all = {}

  constructor(json) {
    this.id = json.id;
    this.title = json.title;
    this.description = json.description;
    this.items = Item.createItemsFromJson(json.items, this);
    Task.all[this.id] = this
  }

  renderTask() {
    const ul = document.querySelector('#tasks');
    ul.className = 'border';
    Task.removeAllChildNodes(ul);
    const itemsUl = document.createElement('ul')
    const div = document.createElement('div');
    const li = document.createElement('li');
    const h1 = document.createElement('h1');
    const h3 = document.createElement('h3');
    const buttonBack = document.createElement('button');
    const buttonDelete = document.createElement('button');
    h1.innerText = this.title;
    h3.innerText = this.description;
    div.className = 'card-body mb-4';
    h1.className = 'card-title';
    h3.className = 'card-subtitle mb-2 text-muted';
    buttonBack.innerText = 'Back';
    buttonDelete.innerText = 'Delete';
    itemsUl.id = 'items';
    div.appendChild(h1);
    div.appendChild(h3);
    div.appendChild(itemsUl);
    li.appendChild(div);
    ul.appendChild(li);
    Item.renderAllItems(this.items);
    Item.itemForm(this);
    buttonBack.className = 'btn btn-secondary';
    buttonDelete.className = 'btn btn-danger';
    li.appendChild(buttonBack);
    li.appendChild(buttonDelete);
    ul.appendChild(li);
    buttonBack.addEventListener('click', () => {
      Task.removeAllChildNodes(ul);
      Task.renderAllTasks();
    });
    buttonDelete.addEventListener('click', () => {
      this.delete();
      delete Task.all[this.id]
      Task.removeAllChildNodes(ul);
      ul.classList.remove('border');
      Task.renderAllTasks();
    });
  }

  delete() {
    fetch(`http://127.0.0.1:3000/tasks/${this.id}`, {
      method: 'DELETE'
    })
    .catch(err => alert(err));
  }

  static get all() {
    return all
  }

  static createTasksFromJson(json) {
    for(const [key, value] of Object.entries(json)) {
      new Task(value);
    }
  }

  static renderAllTasks() {
    for(const [key, task] of Object.entries(Task.all)) {
      const ul = document.querySelector('#tasks');
      ul.classList.add('border');
      const div = document.createElement('div');
      const li = document.createElement('li');
      const h1 = document.createElement('h1');
      const h3 = document.createElement('h3');
      const button = document.createElement('button');
      div.className = 'card-body';
      h1.innerText = task.title;
      h3.innerText = task.description;
      h1.className = 'card-title';
      h3.className = 'card-subtitle mb-2 text-muted';
      button.className = 'card-link';
      button.innerText = "Go to Task";
      li.appendChild(div);
      div.appendChild(h1);
      div.appendChild(h3);
      button.className = 'btn btn-info';
      div.appendChild(button);
      li.className = 'mb-3 mt-3';
      ul.appendChild(li);
      button.addEventListener('click', () => {
        task.renderTask();
      })
    }
  }


  static taskForm() {
    const form = document.querySelector('#new-task-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.querySelector('#title');
      const description = document.querySelector('#description');
      if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
      } else {
        form.classList.remove('was-validated');
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
      task.renderTask();
    })
    .catch(err => console.error(err));
  }

  static removeAllChildNodes = (parent) => {
    while(parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}