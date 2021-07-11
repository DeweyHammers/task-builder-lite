class Item {
  constructor(json) {
    this.id = json.id;
    this.text = json.text;
    this.complete = json.complete;
  }

  static createItemsFromJson(json) {
    const allItems = {};
    for(const [key, value] of Object.entries(json)) {
      const task = new Item(value);
      allItems[key] = task;
    }
    return allItems;
  }
}