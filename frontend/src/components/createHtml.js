class CreateHtml {
  static allTasks(task, application) {
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
    li.appendChild(button);
    ul.appendChild(li);
    EventCalls.handleGoToTask(button, ul, application, task.id);
  }

  static task(task, application) {
    const ul = document.querySelector('#tasks');
    const itemsUl = document.createElement('ul')
    const li = document.createElement('li');
    const h1 = document.createElement('h1');
    const h3 = document.createElement('h3');
    const buttonBack = document.createElement('button');
    const buttonDelete = document.createElement('button');
    h1.innerText = task.title;
    h3.innerText = task.description;
    buttonBack.innerText = 'Back';
    buttonDelete.innerText = 'Delete';
    itemsUl.id = 'items'
    li.appendChild(h1);
    li.appendChild(h3);
    application.renderAllItems(task.items, itemsUl);
    li.appendChild(itemsUl);
    li.appendChild(buttonBack);
    li.appendChild(buttonDelete);
    ul.appendChild(li);
    EventCalls.handleBackButton(buttonBack, ul, application);
  }

  static allItems(item, ul) {
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
    ul.appendChild(li);
    EventCalls.handleDoneButton(button, item, p);
  }
}