import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Note } from '../models/note.model';

export class InMemNoteService implements InMemoryDbService {
  createDb() {
    const notes: Note[] = [
      { id: 1, title: 'grocery list', content: 'popcorn, butter, salt'},
      { id: 2, title: 'reminder', content: 'return tapes to hollywood video' },
      { id: 3, title: 'tech reminder', content: 'make a real backend!' },
    ];
    return {notes};
  }

  genId(notes: Note[]): number {
    return notes.length > 0 ? Math.max(...notes.map(hero => hero.id)) + 1 : 11;
  }
}
