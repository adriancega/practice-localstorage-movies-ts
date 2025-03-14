import Storage from './storage';
import { Film } from '../types/types';

export default function (): void {
  console.log('Export data...');

  const storage = new Storage();
  const exportButton: HTMLButtonElement | null =
    document.querySelector('button.btn-export');

  function exportFn(e: MouseEvent): void {
    console.log('Exporting data...');

    const data: Film[] = storage.getData();
    console.log(JSON.stringify(data));
    // const data = JSON.stringify(localStorage.getItem('films'));
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'films.json';
    a.click();
  }

  exportButton?.addEventListener('click', exportFn);
}
