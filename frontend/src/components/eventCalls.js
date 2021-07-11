class EventCalls {
  static handleGoToTask(button, ul, application, id) {
    button.addEventListener('click', () => {
      application.removeAllChildNodes(ul);
      application.renderTask(id);
    });
  }

  static handleBackButton(button, ul, application) {
    button.addEventListener('click', () => {
      application.removeAllChildNodes(ul);
      application.renderAllTasks();
    });
  }

  static handleDoneButton(button, item, p) {
    button.addEventListener('click', () => {
      FetchCalls.updateItemStatus(item, p);
    });
  }
}