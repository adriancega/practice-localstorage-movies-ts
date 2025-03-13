import Add from './modules/add';
import List from './modules/list';
import Storage from './modules/storage';
import Search from './modules/search';

interface IApp {
  add: Add | null;
  list: List | null;
  storage: Storage | null;
  fetchWords(): any;
  load(): void;
}

export default class App implements IApp {
  add: Add | null;
  list: List | null;
  storage: Storage | null;

  constructor() {
    this.add = null;
    this.list = null;
    this.storage = null;
  }
  fetchWords() {
    throw new Error('Method not implemented.');
  }

  async load() {
    this.add = new Add();
    this.storage = new Storage();
    // Instantiate the List class
    this.list = List.getInstance;
    // Load the list from the storage
    this.list.updateList(this.storage.getData());
    // Display items in the list
    this.list.show();
    // Search functionality
    Search();
  }
}
