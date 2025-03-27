import List from './list';
import Storage from './storage';
import { Film } from '../types/types';
import GlobalContext from '../context/global';

export default function (): void {
  console.log('Searching...');

  const storage = new Storage();
  const list = List.getInstance;
  const context = GlobalContext.instance;

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
      context.searching = false;
      list.updateList(filmsStored);
      list.show(true);
      return;
    }

    context.searching = true;

    const foundFilms: Film[] = filmsStored.filter((f: Film) =>
      f.title.toLocaleLowerCase().includes(searchInput.value.toLowerCase())
    );

    // Empty search results
    if (foundFilms.length === 0) {
      list.updateList(foundFilms);
      list.show(true);
      return;
    }

    list.updateList(foundFilms);
    list.show(true);
  };

  // Search event
  searchInput?.removeEventListener('input', searchEvent);
  searchInput?.addEventListener('input', searchEvent);
}
