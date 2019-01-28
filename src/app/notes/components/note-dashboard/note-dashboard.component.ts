import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { NoteService } from '../../services/note/note.service';
import { Observable } from 'rxjs';
import { Note } from '../../models/note.model';
import { MatDialog, MatGridTile } from '@angular/material';
import { NoteModalComponent } from '../note-modal/note-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { trigger, transition, query, style, stagger, animate, animateChild } from '@angular/animations';

@Component({
  selector: 'app-note-dashboard',
  templateUrl: './note-dashboard.component.html',
  styleUrls: ['./note-dashboard.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(':leave', animate('50ms', style({ opacity: 0, height: '*' })), {
          optional: true
        }),
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class NoteDashboardComponent implements OnInit {
  notes$: Observable<Note[]>;
  noteLength: number;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  constructor(
    private breakpointObserver: BreakpointObserver,
    private noteService: NoteService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.notes$ = this.noteService.getNotes().pipe(
      tap(notes => this.noteLength = notes.length)
    );
  }

  openDialog(note: Note = new Note()): void {
    const dialogRef = this.dialog.open(NoteModalComponent, {
      width: '80%',
      data: note
    });

    dialogRef.afterClosed().subscribe(newNote => {
      if (newNote) {
        if (newNote.id) {
          this.noteService.updateNote(newNote);
        } else {
          this.noteService.addNote(newNote);
        }
      }
    });
  }

  confirmDelete(event: MouseEvent, note: Note): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmModalComponent);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.noteService.deleteNote(note);
      }
    });
  }
}
