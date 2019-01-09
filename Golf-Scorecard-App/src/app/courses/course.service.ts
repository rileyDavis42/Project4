import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Course } from '../../models/course';

@Injectable()
export class CourseService {

  courseUrl = 'http://golf-courses-api.herokuapp.com/courses';

  constructor ( private httpClient: HttpClient ) {}

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.courseUrl);
  }

}
