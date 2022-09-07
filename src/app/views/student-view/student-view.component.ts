import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from './../../models/api-models/student.model';
import { StudentsService } from './../../services/students.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  studentId: string | null = '';
  student: Student = {
    id: "",
    firstName: "",
    lastName: ""
  }

  constructor(
    private readonly studentsService: StudentsService,
    private readonly route: ActivatedRoute,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');

        if (this.studentId) {
          this.studentsService.getStudentById(this.studentId)
          .subscribe(
            (successResponse) => {
              this.student = successResponse;
            }
          );
        }
      }
    );
  }

  onUpdate(): void {
    this.studentsService.updateStudent(this.student.id, this.student)
    .subscribe({
      next: (successResponse) => {
        console.log(successResponse);
        this.snackbar.open('Student updated successfully', undefined, {
          duration: 2000
        })},

      error: (errorResponse) => {
        console.log(errorResponse);
        this.snackbar.open('Error. Student not updated', undefined, {
          duration: 2000
        })}
    });
  }
}
