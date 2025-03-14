import List from './list';
import Storage from './storage';
import { Film } from '../types/types';

export default function (): void {
  console.log('Searching...');

  const storage = new Storage();
  const list = List.getInstance;

  // Search input
  const originalSearchInput: HTMLInputElement | null = document.querySelector(
    'input[name="search"]'
  );
  const searchInput: HTMLInputElement | null = originalSearchInput?.cloneNode(
    true
  ) as HTMLInputElement;
  originalSearchInput?.replaceWith(searchInput);

  const searchEvent = (e: Event) => {
    let filmsStored: Film[] = storage.getData();

    if (!searchInput) return;
    if (searchInput.value.length === 0) {
      list.updateList(filmsStored);
      list.show(true);
      return;
    }

    const foundFilms: Film[] = filmsStored.filter((f: Film) =>
      f.title.toLocaleLowerCase().includes(searchInput.value.toLowerCase())
    );
    list.updateList(foundFilms);
    list.show(true);
  };

  // Search event
  searchInput?.removeEventListener('input', searchEvent);
  searchInput?.addEventListener('input', searchEvent);
}
