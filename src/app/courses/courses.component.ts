import { Course } from './../models/course.model';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent {
  private url = './assets/courses.json';
  courses: any;
  id: string = '';
  name: string = '';
  description: string = '';
  isPartFunded: boolean = false;
  course?: Course;

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.getAllCourses();
  }
  
  getAllCourses(){
      this.http.get(this.url)
      .subscribe(response => {
        for (const key in response) {
          this.courses = response;
        }
      }); 
  }

  addCourse(name: string, description: string, isPartFunded: boolean){
     
    let lastCourseId = this.courses.length - 1;
    let prevId = JSON.stringify(Object.values(this.courses[lastCourseId]).at(0));
    let id = +prevId + +1 as unknown as string;
    this.course = new Course(id, name, description, isPartFunded);
          
    this.courses.push(this.course);

    // this.http.post(this.url, course)
    // .subscribe(responseData => {
    //   console.log(responseData);
    // })
  }

 updateCourse(id: string, name: string, description: string, isPartFunded: boolean){
    let sameId = id;
    let newName = name;
    let newDescription = description;
    let newFundingStatus = isPartFunded;

    for(let i = 0; i <= this.courses.length - 1; i++){
      if(Object.values(this.courses[i]).at(0) == sameId){
        this.course == this.courses[i];
      }
    }
    console.log(this.course);

    // this.course.name = name;
    // this.course.description= description;
    // this.course.isPartFunded = isPartFunded;

    return this.course;

    console.log(this.course);
   

    //console.log(this.course);



    // let modCourse = JSON.stringify(Object.values(this.courses.id).at('id'))

    // this.http.put(this.url + '/' + this.course.id, JSON.stringify(this.course))
    //   .subscribe(response => {
    //   })

  }


}
 