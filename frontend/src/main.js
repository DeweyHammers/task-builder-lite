createTasks = (json) => {
  const allTasks = [];
  for(const [key, value] of Object.entries(json)) {
    const task = new Task(json[key]);
    allTasks.push(task);
  }
  return allTasks;
}

const renderTasks = (allTasks) => {
  const ul = document.querySelector('#tasks');
  allTasks.forEach(task => {
    const li = document.createElement('li');
    const h1 = document.createElement('h1');
    const h3 = document.createElement('h3');
    const button = document.createElement('button');
    h1.innerText = task.title;
    h3.innerText = task.description;
    button.innerText = "Go to Task"
    li.appendChild(h1);
    li.appendChild(h3);
    li.appendChild(button);
    ul.appendChild(li);
    button.addEventListener('click', () => {
      removeAllChildNodes(ul);
      const buttonBack = document.createElement('button');
      const buttonDelete = document.createElement('button');
      const ulItm = document.createElement('ul');
      for(const [key, item] of Object.entries(task.items)) {
        let status = !item.complete
        const li = document.createElement('li');
        const p = document.createElement('p');
        const button = document.createElement('button');
        p.innerText = item.text
        if (item.complete === true) {
          p.classList.add("done");
        }
        button.innerText = 'Done';
        p.appendChild(button);
        li.appendChild(p);
        ulItm.appendChild(li);
        button.addEventListener('click', () =>{
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
            if (status === true) {
              p.classList.add("done");
            } else {
              p.classList.remove("done");
            }
          })
          .then(() => status = !status)
        });
      }
      li.appendChild(ulItm);
      buttonBack.innerText = 'Back';
      buttonDelete.innerText = 'Delete';
      li.appendChild(buttonBack);
      li.appendChild(buttonDelete);
      li.removeChild(button);
      ul.appendChild(li);
      buttonBack.addEventListener('click', () =>{
        removeAllChildNodes(ul);
        fetch('http://127.0.0.1:3000/tasks')
        .then(res => res.json())
        .then(json => createTasks(json))
        .then(allTasks => renderTasks(allTasks))
      });
    });
  });
}

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://127.0.0.1:3000/tasks')
  .then(res => res.json())
  .then(json => createTasks(json))
  .then(allTasks => renderTasks(allTasks))
});