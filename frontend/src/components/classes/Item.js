class Item {
  constructor(json, task) {
    this.id = json.id;
    this.text = json.text;
    this.complete = json.complete;
    this.task = task;
  }

  static createItemsFromJson(json, task) {
    const allItems = [];
    for(const [key, value] of Object.entries(json)) {
      const item = new Item(value, task);
      allItems[key] = item;
    }
    return allItems;
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
      ul = document.querySelector('#items');
      removeAllChildNodes(ul);
      renderAllItems(task.items);
    })
    .catch(err => alert('warning', 'Error', err));
  }
  
  update() {
    let status = !this.complete;
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
    .then(() => {
      const p = document.querySelector(`#text-item-${this.id}`);
      status === true ?  p.classList.add("done") : p.classList.remove("done");
      this.complete = status;
    })
    .catch((err) => alert('warning', 'Error', err));
  }

  delete() {
    fetch(`http://127.0.0.1:3000/items/${this.id}`, {
      method: 'DELETE'
    })
    .then(() => {
      const ul = document.querySelector('#items');
      const li = document.querySelector(`#item-${this.id}`);
      delete this.task.items[this.id];
      ul.removeChild(li);
    })
    .catch((err) => alert('warning', 'Error', err));
  }
}