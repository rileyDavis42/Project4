import { Component, OnInit } from '@angular/core';
import { CourseService } from '../courses/course.service';
import { Course } from '../../models/course';
import { User } from "../../models/user";


@Component({
  selector: 'app-form',
  providers: [ CourseService ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  courses: Course[];
  players: Object[];
  columnsToDisplay = ['playerName', 'playerIndex', 'playerRemove'];
  courseService: CourseService;
  courseID: number;
  teeType: number;

  constructor( courseService: CourseService ) {
    this.courseService = courseService;
  }

  ngOnInit() {
    this.getCourses();
    this.players = [];
    document.getElementById("nameInput").addEventListener("keyup", function (e) {
      e.preventDefault();
      if (e.keyCode === 13) {
        document.getElementById("addPlayerButton").click();
      }
    })
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(courses => this.courses = courses["courses"]);
  }

  addPlayer(name) {
    this.players.push({
      "name": name,
      "index": this.players.length + 1
    });
  }

  removePlayer(id) {
    let newPlayers = [];
    for(let i = 0; i < this.players.length; i++) {
      if(this.players[i]["index"] !== id) {
        newPlayers.push({
          "name": this.players[i]["name"],
          "index": newPlayers.length + 1
        });
      }
    }
    this.players = newPlayers;
  }

  startGame() {
    let newUser: User = new class implements User {
      courseId: number;
      players: Object[];
      teeType: number;
    };
    newUser.courseId = this.courseID;
    newUser.teeType = this.teeType;
    newUser.players = this.players;

    sessionStorage.setItem("players", JSON.stringify(this.players));
    sessionStorage.setItem("teeType", String(this.teeType));
    sessionStorage.setItem("courseID", String(this.courseID["id"]));
    this.courseService.createNewGame(newUser);
  }

}
