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
  task.items.forEach(item => renderItem(item));
  const buttonBack = document.querySelector('#buttonBack');
  const buttonDelete = document.querySelector('#buttonDelete');
  const form = document.querySelector('#item-form');
  buttonBack.addEventListener('click', () => {
    removeAllChildNodes(ul);
    renderAllTasks();
  });
  buttonDelete.addEventListener('click', () => {
    task.delete();
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = document.querySelector('#text');
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
    } else {
      form.classList.remove('was-validated');
      Item.create(text.value, task);
      text.value = '';
    }
  });
}

const renderItem = (item) => {
  ul = document.querySelector('#items');
  li = document.createElement('li');
  li.innerHTML = itemHtml(item);
  li.id = `item-${item.id}`;
  li.className = 'mb-3 card-text';
  ul.appendChild(li);
  const buttonDone = document.querySelector(`#done-item-${item.id}`);
  const buttonRemove = document.querySelector(`#delete-item-${item.id}`);
  buttonDone.addEventListener('click', () => {
      item.update();
  });
  buttonRemove.addEventListener('click', () => {
    item.delete();
  });
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
  .catch(err => alert('warning', 'Error', err));
});