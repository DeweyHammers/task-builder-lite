const alert = (type, name, message) => {
  const div = document.querySelector('#alert');
  const html = `
  <div class="alert alert-${type} alert-dismissible fade show text-center mt-3" role="alert">
    <strong>${name}</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;
  div.innerHTML = html;
}