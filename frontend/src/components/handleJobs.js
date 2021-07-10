class HandleJobs {
  static createTasks(json) {
    const allTasks = [];
    for(const [key, value] of Object.entries(json)) {
      const task = new Task(json[key]);
      allTasks.push(task);
    }
    return allTasks;
  }
  
  static renderTasks(allTasks) {
    const ul = document.querySelector('#tasks');
    allTasks.forEach(task => {
      const li = document.createElement('li');
      const h1 = document.createElement('h1');
      const p = document.createElement('p');
      h1.innerText = task.title;
      p.innerText = task.description;
      li.appendChild(h1);
      li.appendChild(p);
      ul.appendChild(li);
    });
  }
}