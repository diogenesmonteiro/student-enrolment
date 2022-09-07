import { CourseUpdate } from '../models/update-models/course-update.model';
import { CourseAdd } from '../models/add-models/course-add.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/api-models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private baseApiUrl =  'https://localhost:44372';

  constructor(private httpClient: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.baseApiUrl + '/api/courses');
  }

  getCourseById(courseId: string): Observable<Course> {
    return this.httpClient.get<Course>(this.baseApiUrl + '/api/courses/' + courseId);
  }

  updateCourse(courseId: string, courseRequest: Course): Observable<Course> {
    const courseUpdate: CourseUpdate = {
      name: courseRequest.name,
      description: courseRequest.description,
      isPartFunded: courseRequest.isPartFunded
    };

    return this.httpClient.put<Course>(this.baseApiUrl + '/api/courses/' + courseId, courseUpdate);
  }

  deleteCourse(courseId: string): Observable<Course> {
    return this.httpClient.delete<Course>(this.baseApiUrl + '/api/courses/' + courseId);
  }

  addCourse(courseRequest: Course): Observable<Course> {
    const courseAdd: CourseAdd = {
      name: courseRequest.name,
      description: courseRequest.description,
      isPartFunded: courseRequest.isPartFunded
    };

    return this.httpClient.post<Course>(this.baseApiUrl + '/api/courses/', courseAdd);
  }
}
