import Storage from './storage';
import List from './list';

export default function (): void {
  console.log('Import data...');

  const importButton: HTMLButtonElement | null =
    document.querySelector('button.btn-import');
  const storage = new Storage();
  const list = List.getInstance;

  function importFn(e: Event): void {
    console.log('Importing data...');

    const fileInput: HTMLInputElement | null =
      document.createElement('input') || null;
    fileInput.style.opacity = '0';
    fileInput.style.position = 'absolute';
    fileInput.type = 'file';
    fileInput?.classList.add('hidden');
    importButton?.parentElement?.insertAdjacentElement(
      'beforeend',
      fileInput as HTMLInputElement
    );
    fileInput?.addEventListener('change', (e: Event) => {
      console.log("File input's change event...");
      const file = (e.target as HTMLInputElement).files?.[0];
      const reader = new FileReader();

      console.log(file);

      reader.onload = (e: Event) => {
        console.log(e.target as FileReader);
        const data = JSON.parse((e.target as FileReader).result as string);
        storage.setFilms(data);
        list.updateList(data);
        list.show(true);
      };
      reader.onabort = () => console.log('File reading was aborted');
      reader.onerror = () => console.log('File reading has failed');
      reader.onloadend = () => console.log('File reading has finished');
      reader.onloadstart = () => console.log('File reading has started');
      reader.onprogress = () => console.log('File reading in progress');

      reader.readAsText(file as Blob);
      fileInput?.remove();
    });
    fileInput?.click();
  }

  importButton?.removeEventListener('click', importFn);
  importButton?.addEventListener('click', importFn);
}
