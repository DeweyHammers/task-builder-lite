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
    .catch(err => alert(err));
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
}