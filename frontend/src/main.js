document.addEventListener('DOMContentLoaded', () => {
  fetch('http://127.0.0.1:3000/tasks')
  .then(res => res.json())
  .then(json => HandleJobs.createTasks(json))
  .then(allTasks => HandleJobs.renderTasks(allTasks))
});