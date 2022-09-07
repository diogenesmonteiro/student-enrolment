import { SubjectsService } from './../services/subjects.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from '../models/ui-models/subject-ui.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})

export class SubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'edit'];
  dataSource: MatTableDataSource<Subject> = new MatTableDataSource<Subject>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';

  constructor(private subjectsService: SubjectsService) { }

  ngOnInit(): void {
    this.subjectsService.getAllSubjects()
    .subscribe({
      next: (successResponse) => {
        this.subjects = successResponse;
        this.dataSource = new MatTableDataSource<Subject>(this.subjects);

        if(this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }

        if(this.matSort) {
          this.dataSource.sort = this.matSort;
        }
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  filterSubjects() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
