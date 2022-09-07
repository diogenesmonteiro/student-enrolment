import { SubjectUpdate } from '../models/update-models/subject-update.model';
import { SubjectAdd } from '../models/add-models/subject-add.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/api-models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  private baseApiUrl =  'https://localhost:44372';

  constructor(private httpClient: HttpClient) {}

  getAllSubjects(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(this.baseApiUrl + '/api/subjects');
  }

  getSubjectById(subjectId: string): Observable<Subject> {
    return this.httpClient.get<Subject>(this.baseApiUrl + '/api/subjects/' + subjectId);
  }

  updateSubject(subjectId: string, subjectRequest: Subject): Observable<Subject> {
    const subjectUpdate: SubjectUpdate = {
      name: subjectRequest.name,
      description: subjectRequest.description
    };

    return this.httpClient.put<Subject>(this.baseApiUrl + '/api/subjects/' + subjectId, subjectUpdate);
  }

  deleteSubject(subjectId: string): Observable<Subject> {
    return this.httpClient.delete<Subject>(this.baseApiUrl + '/api/subjects/' + subjectId);
  }

  addSubject(subjectRequest: Subject): Observable<Subject> {
    const subjectAdd: SubjectAdd = {
      name: subjectRequest.name,
      description: subjectRequest.description
    };

    return this.httpClient.post<Subject>(this.baseApiUrl + '/api/subjects/', subjectAdd);
  }
}
