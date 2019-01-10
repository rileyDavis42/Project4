import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { User } from "../../models/user";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";

@Injectable()
export class CourseService {

  courseUrl = 'http://golf-courses-api.herokuapp.com/courses';
  courseDataUrl = 'https://golf-courses-api.herokuapp.com/courses/';
  usersRef: AngularFireObject<User>;
  users: Object;

  constructor ( private httpClient: HttpClient, private db: AngularFireDatabase ) {
    this.usersRef = this.db.object<User>("Users");
    this.usersRef.valueChanges().subscribe(data => this.users = data);
  }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.courseUrl);
  }

  getCourse(courseID: number): Observable<Object> {
    this.courseDataUrl += courseID;
    return this.httpClient.get<Object>(this.courseDataUrl);
  }

  createNewGame(newUser: User) {
    let userID = Math.round(Math.random() * 1000);
    let newUserRef = this.db.object('/Users/' + userID);
    newUserRef.update(newUser)
      .then( _=> console.log("User successfully created!"))
      .catch(error => console.log("Error creating user", error));
    sessionStorage.setItem("ID", String(userID));
  }

  getUserData(userID: number) {
    let userData: User;
    let newUserRef = this.db.object<User>("Users/" + userID);
    newUserRef.valueChanges().subscribe(data => userData = data);
    return userData;
  }
}
