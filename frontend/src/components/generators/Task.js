const tasksHomeHtml = (task) => {
  const html = `
    <li class='mb-3 mt-3'>
      <div class='card-body'>
        <h1 class='card-title'>${task.title}</h1>
        <h3 class='card-subtitle mb-2 text-muted'>${task.description}</h3>
        <button id='task-${task.id}' class='card-link btn btn-info'>Go to Task</button>
      <div>
    </li>
  `;
  return html;
}

const taskHtml = (task) => {
  const html = `
    <li>
      <div class='card-body mb-4'>
        <h1 class='card-title'>${task.title}</h1>
        <h3 class='card-subtitle mb-2 text-muted'>${task.description}</h3>
        <ul id='items'>
        </ul>
        <form id='item-form' novalidate>
          <div class='form-floating mb-1'>
            <input type="text" name="text" id="text" placeholder="Create a item" class="form-control" required>
            <label for='text'>Make a new Item</label>
            <div class="invalid-feedback">
              Item cannot be blank!
            </div>
          </div>
          <input type="submit" value="Create Item" class="btn btn-primary w-100">
        </form>
      </div>
      <button id='buttonBack' class="btn btn-secondary">Back</button>
      <button id='buttonDelete' class="btn btn-danger">Delete</button>
    </li>
  `;  
  return html;
}