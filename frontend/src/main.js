document.addEventListener('DOMContentLoaded', () => {
  fetch('http://127.0.0.1:3000/tasks')
  .then(res => res.json())
  .then(json => Task.createTasksFromJson(json))
  .then(allTasks => {
    const application = new Application(allTasks);
    return application;
  })
  .then(application => application.execute())
});