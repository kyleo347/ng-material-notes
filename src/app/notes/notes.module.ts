import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteDashboardComponent } from './components/note-dashboard/note-dashboard.component';
import { MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { NoteService } from './services/note/note.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemNoteService } from './backend/in-mem-note-service';
import { HttpClientModule } from '@angular/common/http';
import { NoteModalComponent } from './components/note-modal/note-modal.component';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [NoteDashboardComponent, NoteModalComponent, ConfirmModalComponent],
  exports: [
    NoteDashboardComponent,
  ],
  providers: [
    NoteService,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemNoteService, { dataEncapsulation: false }),
  ],
  bootstrap: [
    NoteModalComponent,
    ConfirmModalComponent
  ]
})
export class NotesModule { }
