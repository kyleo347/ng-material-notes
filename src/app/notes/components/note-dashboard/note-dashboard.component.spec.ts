import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NoteService } from '../../services/note/note.service';
import { Note } from '../../models/note.model';
import { MatDialog } from '@angular/material';
import { NoteDashboardComponent } from './note-dashboard.component';
import { of } from 'rxjs';
describe('NoteDashboardComponent', () => {
  let component: NoteDashboardComponent;
  let fixture: ComponentFixture<NoteDashboardComponent>;
  beforeEach(() => {
    const breakpointObserverStub = {
      observe: (_: any) => of([true])
    };
    const noteServiceStub = {
      getNotes: () => ({}),
      updateNote: () => ({}),
      addNote: () => ({}),
      deleteNote: () => ({})
    };
    const noteStub = {
      id: 1,
      title: 'groceries',
      content: 'popcorn'
    };
    const matDialogStub = {
      open: () => ({ afterClosed: () => ({ subscribe: (fn: Function) => (fn(noteStub)) }) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NoteDashboardComponent],
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserverStub },
        { provide: NoteService, useValue: noteServiceStub },
        { provide: Note, useValue: noteStub },
        { provide: MatDialog, useValue: matDialogStub }
      ]
    });
    fixture = TestBed.createComponent(NoteDashboardComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('openDialog', () => {
    it('can update note', () => {
      const noteServiceStub: NoteService = fixture.debugElement.injector.get(
        NoteService
      );
      const noteStub: Note = fixture.debugElement.injector.get(Note);
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(noteServiceStub, 'updateNote');
      spyOn(matDialogStub, 'open').and.callThrough();
      component.openDialog(noteStub);
      expect(noteServiceStub.updateNote).toHaveBeenCalled();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const noteServiceStub: NoteService = fixture.debugElement.injector.get(
        NoteService
      );
      spyOn(noteServiceStub, 'getNotes');
      component.ngOnInit();
      expect(noteServiceStub.getNotes).toHaveBeenCalled();
    });
  });
});
