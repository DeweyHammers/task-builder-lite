const itemHtml = (item) => {
  html = `
    <p id='text-item-${item.id}' class='${item.complete ? 'done' : ''}' >${item.text}</p>
    <button id='done-item-${item.id}' class='btn btn-success'>Done</button>
    <button id='delete-item-${item.id}' class='btn btn-danger'>Remove</button>
  `;
  return html;
}