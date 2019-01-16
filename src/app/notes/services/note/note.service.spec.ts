import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Note } from '../../models/note.model';
import { NoteService } from './note.service';


const noteStub = { title: '', content: '' };

describe('NoteService', () => {
  let service: NoteService;
  beforeEach(() => {
    const httpClientStub = {
      get: () => ({ subscribe: () => ({}), pipe: () => ({}) }),
      post: () => ({ pipe: () => ({ subscribe: () => ({}) }) }),
      delete: () => ({ pipe: () => ({ subscribe: () => ({}) }) }),
      put: () => ({ pipe: () => ({ subscribe: () => ({}) }) })
    };
    TestBed.configureTestingModule({
      providers: [
        NoteService,
        { provide: HttpClient, useValue: httpClientStub },
        { provide: Note, useValue: noteStub }
      ]
    });
    spyOn(NoteService.prototype, 'loadNotes');
    service = TestBed.get(NoteService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('addNote', () => {
    it('makes expected calls', () => {
      const httpClientStub: HttpClient = TestBed.get(HttpClient);
      spyOn(httpClientStub, 'post').and.callThrough();
      service.addNote(noteStub);
      expect(httpClientStub.post).toHaveBeenCalled();
    });
  });
  describe('updateNote', () => {
    it('makes expected calls', () => {
      const httpClientStub: HttpClient = TestBed.get(HttpClient);
      spyOn(httpClientStub, 'put').and.callThrough();
      service.updateNote(noteStub);
      expect(httpClientStub.put).toHaveBeenCalled();
    });
  });
  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(NoteService.prototype.loadNotes).toHaveBeenCalled();
    });
  });
  describe('loadNotes', () => {
    it('makes expected calls', () => {
      const httpClientStub: HttpClient = TestBed.get(HttpClient);
      spyOn(httpClientStub, 'get').and.callThrough();
      (<jasmine.Spy>service.loadNotes).and.callThrough();
      service.loadNotes();
      expect(httpClientStub.get).toHaveBeenCalled();
    });
  });
});
