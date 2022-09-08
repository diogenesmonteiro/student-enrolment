import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from './../../models/api-models/course.model';
import { CoursesService } from './../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {
  courseId: string | null = '';
  course: Course = {
    id: "",
    name: "",
    description: "",
    isPartFunded: false
  };

  isNewCourse = false;
  header = '';
  partFundedList = [true, false];

  constructor(
    private readonly coursesService: CoursesService,
    private readonly route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.courseId = params.get('id');

        if (this.courseId) {
          if(this.courseId.toLowerCase() === 'Add'.toLowerCase()) {
            this.isNewCourse = true;
            this.header = 'Add New Course';
          } else {
            this.isNewCourse = false;
            this.header = 'Update Course';

             this.coursesService.getCourseById(this.courseId)
            .subscribe(
              (successResponse) => {
                this.course = successResponse;
              }
            );
          }
        }
      }
    );
  }

  onUpdate(): void {
    this.coursesService.updateCourse(this.course.id, this.course)
      .subscribe({
        next: (successResponse) => {
          this.snackbar.open('Course updated successfully', undefined, {
            duration: 2000
          })
        },

        error: (errorResponse) => {
          this.snackbar.open('Error. Course not updated', undefined, {
            duration: 2000
          }
        )
      }
    });
  }

  onDelete(): void {
    this.coursesService.deleteCourse(this.course.id)
      .subscribe({
        next: (successResponse) => {
          this.snackbar.open('Course deleted successfully', undefined, {
            duration: 2000
          })
        setTimeout(() => {
          this.router.navigateByUrl('courses');
        }, 2000);
        },
        error: (errorResponse) => {
            this.snackbar.open('Error. Course not deleted.', undefined, {
              duration: 2000
          })
        }
      });
  }

  onAdd(): void {
    this.coursesService.addCourse(this.course)
    .subscribe({
      next: (successResponse) => {
        this.snackbar.open('Course added successfully', undefined, {
          duration: 2000
        })
      setTimeout(() => {
        this.router.navigateByUrl('courses');
      }, 2000);
      },
      error: (errorResponse) => {
          this.snackbar.open('Error. Course not added.', undefined, {
            duration: 2000
        })
      }
    });
  }
}
