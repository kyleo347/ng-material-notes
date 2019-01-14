import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoteDashboardComponent } from './notes/components/note-dashboard/note-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: NoteDashboardComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
