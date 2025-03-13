import { Film } from '../types/types';
import deleteFn from './delete';
import editFn from './edit';

interface IList {
  content: HTMLElement;
  films: any;
  getInstance(): List;
  addToList(film: any): void;
  transformPlainTextToParagraphs(text: string): string;
  show(): void;
}

export default class List implements IList {
  static #instance: List;
  content: HTMLElement;
  films: Film[];

  constructor() {
    if (List.#instance) {
      throw new Error(
        'Error: Instantiation failed: Use List.getInstance() instead of new.'
      );
    }
    this.content = document.querySelector('#list-films') as HTMLElement;
    this.films = [];
  }

  getInstance(): List {
    throw new Error('Method not implemented.');
  }

  public static get getInstance(): List {
    if (!List.#instance) {
      List.#instance = new List();
    }

    return List.#instance;
  }

  updateList(films: Film[]) {
    this.films = films;
  }

  transformPlainTextToParagraphs(text: string): string {
    return text
      .split('\n')
      .map((line: string) => `<p>${line}</p>`)
      .join('');
  }

  filmTemplate(film: Film): string {
    return `
      <article id="film-item-${film.id}" class="item" data-id="${film.id}">
        <div class="content">
          <img src="https://placehold.co/450x300/999966/FFFFFF/jpg" alt="${
            film.title
          }" />
          <h3>${film.title} <span>(${film.year})</span></h3>
          <div class="description">
            ${this.transformPlainTextToParagraphs(film.description)}
          </div>
          <div class="actions">
            <button class="edit">Editar</button>
            <button class="delete">Eliminar</button>
          </div>
        </div>
      </article>
    `;
  }

  addToList(film: any): void {
    this.content.insertAdjacentHTML('afterbegin', this.filmTemplate(film));
    // this.content.insertAdjacentHTML('beforeend', this.filmTemplate(film));
  }

  show(resetContent: boolean = false) {
    // Reset content if needed
    if (resetContent) {
      this.content.innerHTML = '';
    }

    this.films.forEach((film: Film) => this.addToList(film));
    deleteFn();
    editFn();
  }
}
