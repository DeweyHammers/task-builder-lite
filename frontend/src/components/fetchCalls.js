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
  }
}