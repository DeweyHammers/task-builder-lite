class Task {
  constructor(json) {
    this.title = json.title
    this.description = json.description
    this.items = json.items
  }
}