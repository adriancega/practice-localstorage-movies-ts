import { Film } from '../types/types';
import Delete from './delete';

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
      <article id="film-item-${film.id}" class="item">
        <h3>${film.title} <span>(${film.year})</span></h3>
        <div class="description">
          ${this.transformPlainTextToParagraphs(film.description)}
        </div>
        <button class="/films/${film.id}/edit">Editar</button>
        <button class="/films/${film.id}/delete">Eliminar</button>
      </article>
    `;
  }

  addToList(film: any): void {
    this.content.insertAdjacentHTML('afterbegin', this.filmTemplate(film));
    // this.content.insertAdjacentHTML('beforeend', this.filmTemplate(film));
  }

  show(resetContent: boolean = false) {
    if (resetContent) {
      this.content.innerHTML = '';
    }

    this.films.forEach((film: Film) => this.addToList(film));
    console.log('Showing films...');
    Delete();
  }
}
