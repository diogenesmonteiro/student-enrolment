import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from './../../models/api-models/student.model';
import { StudentsService } from './../../services/students.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  };

  isNewStudent = false;
  header = '';

  constructor(
    private readonly studentsService: StudentsService,
    private readonly route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');

        if (this.studentId) {
          if(this.studentId.toLowerCase() === 'Add'.toLowerCase()) {
            this.isNewStudent = true;
            this.header = 'Add New Student';
          } else {
            this.isNewStudent = false;
            this.header = 'Update Student';

             this.studentsService.getStudentById(this.studentId)
            .subscribe(
              (successResponse) => {
                this.student = successResponse;
              }
            );
          }
        }
      }
    );
  }

  onUpdate(): void {
    this.studentsService.updateStudent(this.student.id, this.student)
      .subscribe({
        next: (successResponse) => {
          this.snackbar.open('Student updated successfully', undefined, {
            duration: 2000
          })
        },

        error: (errorResponse) => {
          this.snackbar.open('Error. Student not updated', undefined, {
            duration: 2000
          }
        )
      }
    });
  }

  onDelete(): void {
    this.studentsService.deleteStudent(this.student.id)
      .subscribe({
        next: (successResponse) => {
          this.snackbar.open('Student deleted successfully', undefined, {
            duration: 2000
          })
        setTimeout(() => {
          this.router.navigateByUrl('students');
        }, 2000);
        },
        error: (errorResponse) => {
            this.snackbar.open('Error. Student not deleted.', undefined, {
              duration: 2000
          })
        }
      });
  }

  onAdd(): void {
    this.studentsService.addStudent(this.student)
    .subscribe({
      next: (successResponse) => {
        this.snackbar.open('Student added successfully', undefined, {
          duration: 2000
        })
      setTimeout(() => {
        this.router.navigateByUrl('students');
      }, 2000);
      },
      error: (errorResponse) => {
          this.snackbar.open('Error. Student not added.', undefined, {
            duration: 2000
        })
      }
    });
  }
}
