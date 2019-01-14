import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { NoteService } from '../../services/note/note.service';
import { Observable } from 'rxjs';
import { Note } from '../../models/note.model';
import { MatDialog } from '@angular/material';
import { NoteModalComponent } from '../note-modal/note-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-note-dashboard',
  templateUrl: './note-dashboard.component.html',
  styleUrls: ['./note-dashboard.component.css']
})
export class NoteDashboardComponent implements OnInit {
  notes$: Observable<Note[]>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );


  constructor(
    private breakpointObserver: BreakpointObserver,
    private noteService: NoteService,
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.notes$ = this.noteService.getNotes();
  }

  openDialog(note: Note = new Note() ): void {
    const dialogRef = this.dialog.open(NoteModalComponent, {
      width: '80%',
      data: note
    });

    dialogRef.afterClosed().subscribe(newNote => {
      if (newNote) {
        if (newNote.id) {
          this.noteService.updateNote(newNote).subscribe();
        } else {
          this.noteService.addNote(newNote).subscribe();
        }
        this.notes$ = this.noteService.getNotes();
      }
    });
  }

  confirmDelete(event: MouseEvent, note: Note): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmModalComponent);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.noteService.deleteNote(note).subscribe();
        this.notes$ = this.noteService.getNotes();
      }
    });
  }
}
