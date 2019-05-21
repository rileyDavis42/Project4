import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { User } from "../../models/user";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import {Router} from '@angular/router';

@Injectable()
export class CourseService {

  courseUrl = 'https://golf-courses-api.herokuapp.com/courses';
  courseDataUrl = 'https://golf-courses-api.herokuapp.com/courses/';
  usersRef: AngularFireObject<User>;
  users: Object;

  constructor ( private httpClient: HttpClient, private db: AngularFireDatabase, private router: Router ) {
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
    this.router.navigate(['/game']);
  }

  getUserData(userID: number) {
    let newUserRef = this.db.object<User>("Users/" + userID);
    return newUserRef.valueChanges();
  }

  saveGame(userID: number, user: User) {
    let userUpdateRef = this.db.object('Users/' + userID);
    userUpdateRef.update(user)
      .then(_=> console.log("Successfully saved game..."))
      .catch(error => console.log("Error saving game", error));
  }

  resumeGame(userID) {
    this.getUserData(userID).subscribe(user => {
      sessionStorage.setItem("players", JSON.stringify(user['players']));
      sessionStorage.setItem("teeType", String(user['teeType']));
      sessionStorage.setItem("course", JSON.stringify(user['course']));
      sessionStorage.setItem("ID", userID);
      this.router.navigate(['/game']);
    });
  }

}
