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

  renderItem() {
    const li = document.createElement('li');
    li.innerHTML = itemHtml(this);
    li.id = `item-${this.id}`;
    li.className = 'mb-3 card-text';
    document.querySelector('#items').appendChild(li);
    document.querySelector(`#done-item-${this.id}`).onclick = () => this.update();
    document.querySelector(`#delete-item-${this.id}`).onclick = () => this.delete();
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
      item.renderItem();
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
    .then(() => delete this.task.items[this.id])
    .then(() => document.querySelector('#items').removeChild(document.querySelector(`#item-${this.id}`)))
    .catch((err) => alert('warning', 'Error', err));
  }
}