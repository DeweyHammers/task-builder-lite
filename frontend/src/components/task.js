const all = {}

const removeAllChildNodes = (parent) => {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

class Task {
  constructor(json) {
    this.id = json.id;
    this.title = json.title;
    this.description = json.description;
    this.items = Item.createItemsFromJson(json.items, this);
    all[this.id] = this
  }

  renderTask() {
    const ul = document.querySelector('#tasks');
    removeAllChildNodes(ul);
    const itemsUl = document.createElement('ul')
    const li = document.createElement('li');
    const h1 = document.createElement('h1');
    const h3 = document.createElement('h3');
    const buttonBack = document.createElement('button');
    const buttonDelete = document.createElement('button');
    h1.innerText = this.title;
    h3.innerText = this.description;
    buttonBack.innerText = 'Back';
    buttonDelete.innerText = 'Delete';
    li.id = 'selected-task';
    itemsUl.id = 'items';
    li.appendChild(h1);
    li.appendChild(h3);
    li.appendChild(itemsUl);
    ul.appendChild(li);
    Item.renderAllItems(this.items);
    Item.itemForm(this);
    buttonBack.className = 'btn btn-secondary';
    buttonDelete.className = 'btn btn-danger';
    li.appendChild(buttonBack);
    li.appendChild(buttonDelete);
    ul.appendChild(li);
    buttonBack.addEventListener('click', () => {
      removeAllChildNodes(ul);
      Task.renderAllTasks();
    });
    buttonDelete.addEventListener('click', () => {
      this.delete();
      delete Task.all[this.id]
      removeAllChildNodes(ul);
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

  static taskForm() {
    const form = document.querySelector('#new-task-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.querySelector('#title');
      const description = document.querySelector('#description');
      Task.createNewTask(title.value, description.value);
      title.value = '';
      description.value = '';
    })
  }

  static renderAllTasks() {
    for(const [key, task] of Object.entries(Task.all)) {
      const ul = document.querySelector('#tasks');
      const li = document.createElement('li');
      const h1 = document.createElement('h1');
      const h3 = document.createElement('h3');
      const button = document.createElement('button');
      h1.innerText = task.title;
      h3.innerText = task.description;
      button.innerText = "Go to Task"
      li.appendChild(h1);
      li.appendChild(h3);
      button.className = 'btn btn-info';
      li.appendChild(button);
      li.className = 'mb-5';
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
      if(title.value === '' && description.value === '') {
        alert('Title and Description cannot be Blank!')
      } else if(title.value === '') {
        alert('Title cannot be blank!')
      } else if(description.value === '') {
        alert('Description cannot be Blank!')
      } else {
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
      return task;
    })
    .then(task => {
      task.renderTask();
    })
    .catch(err => console.error(err));
  }
}