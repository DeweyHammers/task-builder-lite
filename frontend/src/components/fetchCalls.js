class FetchCalls {
  static createNewTask(title, description, application) {
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
      application.tasks[json.id] = task;
      return task;
    })
    .then(task => {
      const ul = document.querySelector('#tasks');
      application.removeAllChildNodes(ul);
      CreateHtml.task(task, application);
    })
    .catch(err => console.error(err));
  }

  static deleteTask(application, task_id) {
    fetch(`http://127.0.0.1:3000/tasks/${task_id}`, {
      method: 'DELETE'
    })
    .then(() => delete application.tasks[task_id])
    .then(() => {
      const ul = document.querySelector('#tasks');
      application.removeAllChildNodes(ul);
      application.renderAllTasks();
    })
    .catch(err => alert(err));
  }
  
  static createNewItem(value, task) {
    fetch('http://127.0.0.1:3000/items', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        text: value,
        complete: false,
        task_id: task.id
      })
    })
    .then(res => res.json())
    .then(json => {
      const item = new Item({id: json.id, text: value, complete: false})
      task.items[item.id] = item
      CreateHtml.item(item, task)
    })
    .catch(err => alert(err));
  }

  static updateItemStatus(item) {
    let status = !item.complete
    fetch(`http://127.0.0.1:3000/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify({
        complete: status
        })
      })
      .then(() => {
      const p = document.querySelector('#item-text');
      if (status === true) {
        p.classList.add("done");
      } else {
        p.classList.remove("done");
      }
    })
    .then(() => item.complete = status)
    .catch((err) => alert(err));
  }

  static removeItem(task, item, ul, li) {
    fetch(`http://127.0.0.1:3000/items/${item.id}`, {
      method: 'DELETE'
    })
    .then(() => delete task.items[item.id])
    .then(() => ul.removeChild(li));
  }
}