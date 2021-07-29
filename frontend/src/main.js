const tasksUl = document.querySelector('#tasks');

const removeAllChildNodes = (parent) => {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://127.0.0.1:3000/tasks')
  .then(res => res.json())
  .then(json => Task.createTasksFromJson(json))
  .catch(err => alert('warning', 'Error', err));
  Task.handleNewTaskForm();
});