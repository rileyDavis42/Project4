import { Component, OnInit } from '@angular/core';
import { CourseService } from '../courses/course.service';
import { Course } from '../../models/course';
import { User } from "../../models/user";
import { Router } from '@angular/router';


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
  courseData;
  avgPar: number;
  totalYards: number;

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
      "index": this.players.length + 1,
      "scores": []
    });
  }

  removePlayer(id) {
    let newPlayers = [];
    for(let i = 0; i < this.players.length; i++) {
      if(this.players[i]["index"] !== id) {
        newPlayers.push({
          "name": this.players[i]["name"],
          "index": newPlayers.length + 1,
          "scores": newPlayers[i]["scores"]
        });
      }
    }
    this.players = newPlayers;
  }

  displayCourseInfo() {
    if(this.teeType !== undefined && this.courseID !== undefined) {
      this.courseService.getCourse(this.courseID).subscribe(info => {

        this.courseData = info['data'];
        let course_holes = this.courseData['holes'];
        this.avgPar = 0;
        this.totalYards = 0;

        for (let i = 0; i < course_holes.length; i++) {
          this.avgPar += course_holes[i]['teeBoxes'][this.teeType]['par'];
          this.totalYards += course_holes[i]['teeBoxes'][this.teeType]['yards'];
        }
        this.avgPar /= course_holes.length;

      });
    }
  }



  startGame() {
    if(this.players.length < 1) {
      alert("Please add at least one player...");
      return;
    } else if (this.teeType === undefined) {
      alert("Please select a tee type...");
    } else if (this.courseID === undefined) {
      alert("Please select a course...");
    } else {
      for(let i = 0; i < this.players.length; i++) {
        for(let j = 0; j < 18; j++) {
          this.players[i]["scores"].push("");
        }
      }
      let newUser: User = new class implements User {
        course: Course;
        players: Object[];
        teeType: number;
      };
      newUser.course = this.course;
      newUser.teeType = this.teeType;
      newUser.players = this.players;

      sessionStorage.setItem("players", JSON.stringify(this.players));
      sessionStorage.setItem("teeType", String(this.teeType));
      sessionStorage.setItem("course", JSON.stringify(this.course));
      this.courseService.createNewGame(newUser);
    }

  }

  get course(): Course {
    for(let i = 0; i < this.courses.length; i++) {
      if (this.courses[i]['id']) {
        return this.courses[i];
      }
    }
    return this.courses[0];
  }

}
