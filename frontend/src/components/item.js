class Item {
  constructor(json, task) {
    this.id = json.id;
    this.text = json.text;
    this.complete = json.complete;
    this.task = task;
  }

  renderItem() {
    const ul = document.querySelector('#items')
    const li = document.createElement('li');
    const p = document.createElement('p');
    const buttonDone = document.createElement('button');
    const buttonRemove = document.createElement('button');
    p.innerText = this.text;
    p.id = 'item-text';
    if (this.complete === true) {
      p.classList.add("done");
    }
    buttonDone.innerText = 'Done';
    buttonRemove.innerText = 'Remove';
    p.appendChild(buttonDone);
    p.appendChild(buttonRemove);
    li.appendChild(p);
    ul.appendChild(li);
    buttonDone.addEventListener('click', () => {
      let status = !this.complete;
      this.update(status);
      status === true ?  p.classList.add("done") : p.classList.remove("done");
      this.complete = status;
    });
    buttonRemove.addEventListener('click', () => {
      this.delete()
      delete this.task.items[this.id];
      ul.removeChild(li);
    });
  }

  update(status) {
    fetch(`http://127.0.0.1:3000/items/${this.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify({
        complete: status
      })
    })
    .catch((err) => alert(err));
  }

  delete() {
    fetch(`http://127.0.0.1:3000/items/${this.id}`, {
      method: 'DELETE'
    })
    .catch((err) => alert(err));
  }

  static createItemsFromJson(json, task) {
    const allItems = [];
    for(const [key, value] of Object.entries(json)) {
      const item = new Item(value, task);
      allItems[key] = item;
    }
    return allItems;
  }

  static renderAllItems(items) {
    for(const [key, item] of Object.entries(items)) {
      item.renderItem();
    };
  }

  static itemForm(task) {
    const li = document.querySelector('#selected-task');
    const form = document.createElement('form');
    const inpItem = document.createElement('input');
    const inpSubmit = document.createElement('input')
    inpItem.type = 'text';
    inpItem.name = 'text';
    inpItem.id = 'text';
    inpItem.placeholder = 'Create a item';
    inpSubmit.type = 'submit';
    inpSubmit.value = 'Create Item';
    form.appendChild(inpItem);
    form.appendChild(inpSubmit);
    li.appendChild(form);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const text = document.querySelector('#text');
      text.value === '' ? alert('Text cannot be blank!') : Item.create(text.value, task);
      text.value = '';
    });
  }

  static create(text, task) {
    fetch('http://127.0.0.1:3000/items', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        text: text,
        complete: false,
        task_id: task.id
      })
    })
    .then(res => res.json())
    .then(json => {
      const item = new Item({id: json.id, text: text, complete: false, task_id: json.task_id}, task);
      task.items[json.id] = item;
      item.renderItem()
    })
    .catch(err => alert(err));
  }
}