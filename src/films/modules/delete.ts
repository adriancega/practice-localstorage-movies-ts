import Storage from './storage';
import List from './list';
import { Film } from '../types/types';

export default function (): void {
  console.log('Deleting...');
  // Your code here
  const storage = new Storage();
  const list = List.getInstance;

  // Get the films from the storage
  const films = storage.getData();

  films.forEach((film: Film) => {
    const card: HTMLElement | null = document.getElementById(
      `film-item-${film.id}`
    );
    card?.querySelector('button.delete')?.addEventListener('click', () => {
      const newFilms: Film[] = films.filter((f: Film) => f.id !== film.id);
      console.log(newFilms);
      storage.setFilms(newFilms);
      list.updateList(newFilms);
      list.show(true);
    });
  });
}
