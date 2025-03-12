import Storage from './storage';
import List from './list';
import { Film } from '../types/types';

interface IAdd {
  storage: Storage;
  inputTitle: HTMLInputElement;
  inputYear: HTMLInputElement;
  textareaDescription: HTMLTextAreaElement;
  save_btn: HTMLButtonElement;
  list: List;
  save(): boolean;
}

export default class Add implements IAdd {
  inputTitle: HTMLInputElement;
  inputYear: HTMLInputElement;
  textareaDescription: HTMLTextAreaElement;
  save_btn: HTMLButtonElement;
  list: List;

  constructor() {
    this.storage = new Storage();
    this.inputTitle = document.querySelector(
      'input[name="title"]'
    ) as HTMLInputElement;
    this.inputYear = document.querySelector(
      'input[name="year"]'
    ) as HTMLInputElement;
    this.textareaDescription = document.querySelector(
      'textarea[name="description"]'
    ) as HTMLTextAreaElement;
    this.save_btn = document.querySelector(
      'input[type="submit"]'
    ) as HTMLButtonElement;
    this.save_btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.save();
    });
    this.list = List.getInstance;
  }
  storage: Storage;

  save() {
    let error = false;

    if (!this.inputTitle.value) {
      this.inputTitle.classList.add('error');
      this.inputTitle.focus();
      setTimeout(() => {
        this.inputTitle.classList.remove('error');
      }, 3000);
      error = true;
    }

    if (!this.inputYear.value) {
      this.inputYear.classList.add('error');
      this.inputYear.focus();
      setTimeout(() => {
        this.inputYear.classList.remove('error');
      }, 3000);
      error = true;
    }

    if (!this.textareaDescription.value) {
      this.textareaDescription.classList.add('error');
      this.textareaDescription.focus();
      setTimeout(() => {
        this.textareaDescription.classList.remove('error');
      }, 3000);
      error = true;
    }

    if (error) {
      return false;
    }

    const film: Film = {
      id: this.storage.getLastIdInList(),
      title: this.inputTitle.value,
      year: parseInt(this.inputYear.value),
      description: this.textareaDescription.value,
    };

    this.storage.addFilm(film);

    // Reset form
    // const form = document.querySelector('form[id="x-add"]') as HTMLFormElement;
    // if (form instanceof HTMLFormElement) {
    //   form.reset();
    // }

    // Update the list
    this.list.updateList(this.storage.getData());
    this.list.show(true);

    return true;
  }
}
