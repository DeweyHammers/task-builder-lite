const renderAllTasks = () => {
  const ul = document.querySelector('#tasks');
  const tasks = [];
  for(const [key, task] of Object.entries(Task.all)) {
    ul.classList.add('border');
    tasks.push(tasksHomeHtml(task));
  }
  ul.innerHTML = tasks.join('\n');
  for(const [key, task] of Object.entries(Task.all)) {
    const button = document.querySelector(`#task-${task.id}`)
    button.addEventListener('click', () => {
      renderTask(task);
    })
  }
}

const renderTask = (task) => {
  const ul = document.querySelector('#tasks');
  ul.classList.add('border');
  removeAllChildNodes(ul);
  ul.innerHTML = taskHtml(task);
  renderAllItems(task.items);
  const buttonBack = document.querySelector('#buttonBack');
  const buttonDelete = document.querySelector('#buttonDelete');
  const form = document.querySelector('#item-form');
  buttonBack.addEventListener('click', () => {
    removeAllChildNodes(ul);
    renderAllTasks();
  });
  buttonDelete.addEventListener('click', () => {
    task.delete();
    delete Task.all[task.id]
    removeAllChildNodes(ul);
    ul.classList.remove('border');
    renderAllTasks();
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = document.querySelector('#text');
    Item.create(text.value, task);
    text.value = '';
  });
}

const renderAllItems = (items) => {
  ul = document.querySelector('#items')
  const Allitems = [];
  for(const [key, item] of Object.entries(items)) {
    Allitems.push(itemHtml(item));
  };
  ul.innerHTML = Allitems.join('\n');
  for(const [key, item] of Object.entries(items)) {
    const buttonDone = document.querySelector(`#done-item-${item.id}`);
    const buttonRemove = document.querySelector(`#delete-item-${item.id}`);
    const li = document.querySelector(`#item-${item.id}`);
    const p = document.querySelector(`#text-item-${item.id}`);
    buttonDone.addEventListener('click', () => {
      let status = !item.complete;
      item.update(status);
      status === true ?  p.classList.add("done") : p.classList.remove("done");
      item.complete = status;
    });
    buttonRemove.addEventListener('click', () => {
      item.delete()
      delete item.task.items[item.id];
      ul.removeChild(li);
    });
  };
}

const taskForm = () => {
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

const removeAllChildNodes = (parent) => {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://127.0.0.1:3000/tasks')
  .then(res => res.json())
  .then(json => Task.createTasksFromJson(json))
  .then(() => {
    taskForm();
    renderAllTasks();
  })
  .catch((err) => alert(err));
});