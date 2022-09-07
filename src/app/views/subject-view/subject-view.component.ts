import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from './../../models/api-models/subject.model';
import { SubjectsService } from './../../services/subjects.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.css']
})
export class SubjectViewComponent implements OnInit {
  subjectId: string | null = '';
  subject: Subject = {
    id: "",
    name: "",
    description: ""
  };

  isNewSubject = false;
  header = '';

  constructor(
    private readonly subjectsService: SubjectsService,
    private readonly route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.subjectId = params.get('id');

        if (this.subjectId) {
          if(this.subjectId.toLowerCase() === 'Add'.toLowerCase()) {
            this.isNewSubject = true;
            this.header = 'Add New Subject';
          } else {
            this.isNewSubject = false;
            this.header = 'Update Subject';

             this.subjectsService.getSubjectById(this.subjectId)
            .subscribe(
              (successResponse) => {
                this.subject = successResponse;
              }
            );
          }
        }
      }
    );
  }

  onUpdate(): void {
    this.subjectsService.updateSubject(this.subject.id, this.subject)
      .subscribe({
        next: (successResponse) => {
          this.snackbar.open('Subject updated successfully', undefined, {
            duration: 2000
          })
        },

        error: (errorResponse) => {
          this.snackbar.open('Error. Subject not updated', undefined, {
            duration: 2000
          }
        )
      }
    });
  }

  onDelete(): void {
    this.subjectsService.deleteSubject(this.subject.id)
      .subscribe({
        next: (successResponse) => {
          this.snackbar.open('Subject deleted successfully', undefined, {
            duration: 2000
          })
        setTimeout(() => {
          this.router.navigateByUrl('subjects');
        }, 2000);
        },
        error: (errorResponse) => {
            this.snackbar.open('Error. Subject not deleted.', undefined, {
              duration: 2000
          })
        }
      });
  }

  onAdd(): void {
    this.subjectsService.addSubject(this.subject)
    .subscribe({
      next: (successResponse) => {
        this.snackbar.open('Subject added successfully', undefined, {
          duration: 2000
        })
      setTimeout(() => {
        this.router.navigateByUrl('subjects');
      }, 2000);
      },
      error: (errorResponse) => {
          this.snackbar.open('Error. Subject not added.', undefined, {
            duration: 2000
        })
      }
    });
  }
}
