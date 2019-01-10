import { Component, OnInit } from '@angular/core';
import { CourseService } from "../courses/course.service";
import { User } from "../../models/user";

@Component({
  selector: 'app-game',
  providers: [ CourseService ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  course: Object;
  courseService: CourseService;
  user: User;
  userID;
  courseID;
  teeType;
  players: Object[];

  constructor(courseService: CourseService) {
    this.courseService = courseService;
    this.userID = sessionStorage.getItem("ID");
    this.courseID = sessionStorage.getItem("courseID");
    this.teeType = sessionStorage.getItem("teeType");
    this.players = JSON.parse(sessionStorage.getItem("players"));
  }

  ngOnInit() {
    this.getCourse();
  }

  getCourse() {
    this.courseService.getCourse(this.courseID).subscribe(course => this.course = course["data"]);
  }

}
