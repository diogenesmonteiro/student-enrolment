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
  studentId: string | null | undefined;
  student: Student = {
    id: "",
    firstName: "",
    lastName: ""
  }

  constructor(private readonly studentsService: StudentsService,
    private readonly route: ActivatedRoute) { }

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
      })
  }
}
