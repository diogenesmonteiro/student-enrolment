import { CoursesService } from './../services/courses.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../models/ui-models/course-ui.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})

export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'isPartFunded', 'edit'];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.getAllCourses()
    .subscribe({
      next: (successResponse) => {
        this.courses = successResponse;
        this.dataSource = new MatTableDataSource<Course>(this.courses);

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

  filterCourses() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
