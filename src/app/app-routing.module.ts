import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentViewComponent } from './views/student-view/student-view.component';
import { SubjectViewComponent } from './views/subject-view/subject-view.component';
import { CourseViewComponent } from './views/course-view/course-view.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  },
  {
    path: 'subjects',
    component: SubjectsComponent
  },
  {
    path: 'subjects/:id',
    component: SubjectViewComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'courses/:id',
    component: CourseViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
