import Storage from './storage';
import List from './list';
import { Film } from '../types/types';

export default function (): void {
  console.log('Editing...');

  const storage = new Storage();
  const list = List.getInstance;

  let filmsStored = storage.getData();
  let filmsViewed = list.films;

  const template = `
    <form id="edit-form" class="edit-form">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" value="#title" required />
      <label for="year">Year:</label>
      <input type="number" id="year" name="year" value="#year" required />
      <label for="description">Description:</label>
      <textarea id="description" name="description" required>#description</textarea>
      <div class="actions">
        <button type="submit" class="update">Actualizar</button>
        <button type="button" class="cancel">Cancelar</button>
      </div>
    </form>
  `;

  const getFormTemplate = (film: Film, template: string): string => {
    return template
      .replace('#title', film.title)
      .replace('#year', film.year.toString())
      .replace('#description', film.description);
  };

  filmsViewed.forEach((film: Film) => {
    const card = document.getElementById(`film-item-${film.id}`);
    const button = card?.querySelector(`button[class*="edit"]`);

    // Edit film event
    button?.addEventListener('click', () => {
      console.log('Editing film with id: ', film.id);

      // Hide actions div in the card
      // card?.querySelector('.actions')?.classList?.add('hidden');

      // Insert the form in the card
      const parser = new DOMParser();
      const doc: Document = parser.parseFromString(
        getFormTemplate(film, template),
        'text/html'
      ) as Document;
      const form: HTMLFormElement = doc.body.querySelector(
        'form'
      ) as HTMLFormElement;
      card?.appendChild(form);
      form.classList.add('show');

      /* Update film */
      form.querySelector('.update')?.addEventListener('click', (e) => {
        e.preventDefault();
        const newFilm: Film = {
          id: film.id,
          title: (form.querySelector('input[name="title"]') as HTMLInputElement)
            .value,
          year: parseInt(form.year.value),
          description: form.description.value,
        };
        // Update film in the storage
        filmsStored = filmsStored.map((f: Film) =>
          f.id === film.id ? newFilm : f
        );
        // Update film in the list
        storage.setFilms(filmsStored);
        // Update list
        list.updateList(filmsStored);
        // Print the list with the updated film
        list.show(true);
      });

      /* Cancel editing */
      form.querySelector('.cancel')?.addEventListener('click', () => {
        // card?.querySelector('.actions')?.classList?.remove('hidden');
        form.classList.remove('show');
        form.classList.add('hidden');
        form.addEventListener('animationend', () => {
          console.log('Removing form...');
          form.remove();
        });
      });
    });
  });
}
