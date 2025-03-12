import { Film } from '../types/types';

interface IStorage {
  lastId: number;
  getLastIdInList(): number;
  getData(): any;
  setFilms(films: Film[]): void;
  addFilm(data: Object): boolean;
}

export default class Storage implements IStorage {
  lastId: number;

  constructor() {
    this.lastId = 0;
  }

  getLastIdInList(): number {
    this.getData();
    return this.lastId;
  }

  getData(): Film[] {
    let films: Film[] = JSON.parse(<any>localStorage.getItem('films'));

    if (!films || films.length === 0) {
      films = [];
      this.lastId = 0;
    } else {
      this.lastId = films[films.length - 1].id + 1;
    }

    return films;
  }

  setFilms(films: Film[]): void {
    try {
      localStorage.setItem('films', JSON.stringify(films));
    } catch (e) {
      console.error(e);
    }
  }

  addFilm(film: Film): boolean {
    if (!film) {
      return false;
    }

    try {
      const films = this.getData();
      films.push(film);
      localStorage.setItem('films', JSON.stringify(films));
      this.lastId++;
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
