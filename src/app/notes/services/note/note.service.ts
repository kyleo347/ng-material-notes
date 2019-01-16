import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Note } from '../../models/note.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NoteService {
  notes: Observable<Note[]>;
  private _notes = new BehaviorSubject<Note[]>([]);
  private store: { notes: Note[] } = { notes: [] };
  private notesUrl = 'api/notes';  // URL to web api

  constructor(private http: HttpClient) {
    this.notes = this._notes.asObservable();
    this.loadNotes();
  }

    /** GET notes from the server */
  loadNotes() {
    this.http.get<Note[]>(this.notesUrl).subscribe(notes => {
      this.store.notes = notes;
      this._notes.next([...this.store.notes]);
    }, error => console.error('could not load notes'));
  }

  getNotes(): Observable<Note[]> {
    return this.notes;
    // return this.http.get<Note[]>(this.notesUrl)
    //   .pipe(
    //     catchError(this.handleError('getNotes', []))
    //   );
  }

  /** GET note by id. Return `undefined` when id not found */
  getNoteNo404<Data>(id: number): Observable<Note> {
    const url = `${this.notesUrl}/?id=${id}`;
    return this.http.get<Note[]>(url)
      .pipe(
        map(notes => notes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<Note>(`getNote id=${id}`))
      );
  }

  /** GET note by id. Will 404 if id not found */
  // getNote(id: number): Observable<Note> {
  //   const url = `${this.notesUrl}/${id}`;
  //   return this.http.get<Note>(url).pipe(
  //     catchError(this.handleError<Note>(`getNote id=${id}`))
  //   );
  // }

  /* GET notes whose name contains search term */
  // searchNotes(term: string): Observable<Note[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty note array.
  //     return of([]);
  //   }
  //   return this.http.get<Note[]>(`${this.notesUrl}/?name=${term}`).pipe(
  //     catchError(this.handleError<Note[]>('searchNotes', []))
  //   );
  // }

  //////// Save methods //////////

  /** POST: add a new note to the server */
  addNote(note: Note) {
    return this.http.post<Note>(this.notesUrl, note, httpOptions).pipe(
      catchError(this.handleError<Note>('addNote'))
    ).subscribe(newNote => {
      this.store.notes.push(newNote);
      this._notes.next([...this.store.notes]);
    }, error => console.error('could not add note ' + note.title));
  }

  /** DELETE: delete the note from the server */
  deleteNote(note: Note | number) {
    const id = typeof note === 'number' ? note : note.id;
    const url = `${this.notesUrl}/${id}`;

    return this.http.delete<Note>(url, httpOptions).pipe(
      catchError(this.handleError<Note>('deleteNote'))
    ).subscribe(data => {
      this.store.notes.forEach((val, idx) => {
        if (val.id === id) {
          this.store.notes.splice(idx, 1);
        }
      });
      this._notes.next([...this.store.notes]);
    }, error => console.error('could not delete note ' + id));
  }

  /** PUT: update the note on the server */
  updateNote(note: Note) {
    return this.http.put(this.notesUrl, note, httpOptions).pipe(
      catchError(this.handleError<any>('updateNote'))
    ).subscribe(newNote => {
      this.store.notes.forEach((val, idx) => {
        if (val.id === note.id) {
          this.store.notes[idx] = note;
        }
      });
      this._notes.next([...this.store.notes]);
    }, error => console.error('could not update note ' + note.title));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
