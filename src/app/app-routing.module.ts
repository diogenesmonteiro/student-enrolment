import { StudentsComponent } from './students/students.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentViewComponent } from './views/student-view/student-view.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent
  },
  {
    path: 'students',
    component: StudentsComponent
  },
  {
    path: 'students/:id',
    component: StudentViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
