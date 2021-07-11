class FetchCalls {
  static updateItemStatus(item, p) {
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
      if (status === true) {
        p.classList.add("done");
      } else {
        p.classList.remove("done");
      }
    })
    .then(() => item.complete = status)
    .catch((err) => alert(err));
  }

  static createNewItem(value, task, ul) {
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
      CreateHtml.item(item, task, ul)
    })
    .catch((err) => console.log(err));
  }

  static removeItem(task, item, ul, li) {
    fetch(`http://127.0.0.1:3000/items/${item.id}`, {
      method: 'DELETE'
    })
    .then(() => delete task.items[item.id])
    .then(() => ul.removeChild(li));
  }
}