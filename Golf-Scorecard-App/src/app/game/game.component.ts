import { Component, OnInit } from '@angular/core';
import { CourseService } from "../courses/course.service";
import { User } from "../../models/user";
import { Course } from '../../models/course';

@Component({
  selector: 'app-game',
  providers: [ CourseService ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  course: Object;
  courseService: CourseService;
  userID;
  courseGen;
  teeType;
  players: Object[];
  isLoaded = false;
  parTotal;
  yardsTotal;
  handicapTotal;

  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  ngOnInit() {
    this.userID = sessionStorage.getItem("ID");
    this.teeType = sessionStorage.getItem("teeType");
    this.courseGen = JSON.parse(sessionStorage.getItem("course"));
    this.players = JSON.parse(sessionStorage.getItem("players"));
    this.getCourse()
      .then(_ => console.log("Got course from session..."))
      .catch(error => console.log("Error getting course from session,", error));

  }

  async getCourse() {
    this.courseService.getCourse(this.courseGen['id']).subscribe(course => {
      this.course = course["data"];
      document.getElementById('background').style.background = "#87CEFA url(" + this.course["thumbnail"] + ") no-repeat fixed center";
      document.getElementById('background').style.backgroundSize = "cover";
      this.isLoaded = true;
      let course_holes = course['data']['holes'];
      this.parTotal = 0;
      this.yardsTotal = 0;
      this.handicapTotal = 0;

      for (let i = 0; i < course_holes.length; i++) {
        this.parTotal += course_holes[i]['teeBoxes'][this.teeType]['par'];
        this.yardsTotal += course_holes[i]['teeBoxes'][this.teeType]['yards'];
        this.handicapTotal += course_holes[i]['teeBoxes'][this.teeType]['hcp'];
      }
    });
  }

  saveGame() {
    let myUser: User = new class implements User {
      course: Course;
      players: Object[];
      teeType: number;
    };
    myUser.course = this.courseGen;
    myUser.players = this.players;
    myUser.teeType = this.teeType;
    this.courseService.saveGame(this.userID, myUser);
    alert("Your game has been saved, your user ID is " + this.userID);
  }

  getScoreTotal(scores): number {
    let scoresTotal = 0;
    for(let i = 0; i < scores.length; i++) {
      scoresTotal += Number(scores[i]);
    }
    return scoresTotal;
  }

  resetGame() {
    if(confirm("Reset all the scores?")) {
      for(let i = 0; i < this.players.length; i++) {
        this.players[i] = {
          index: this.players[i]["index"],
          name: this.players[i]["name"],
          scores: []
        }
      }
    }
  }

}
