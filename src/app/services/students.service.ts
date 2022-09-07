import { StudentUpdate } from './../models/update-models/student-update-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseApiUrl =  'https://localhost:44372';

  constructor(private httpClient: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/api/students');
  }

  getStudentById(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/api/students/' + studentId);
  }

  updateStudent(studentId: string, studentRequest: Student): Observable<Student> {
    const studentUpdate: StudentUpdate = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName
    }

    return this.httpClient.put<Student>(this.baseApiUrl + '/api/students/' + studentId, studentUpdate);
  }
}
