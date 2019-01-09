import {Component, OnInit} from '@angular/core';
import { CourseService } from '../courses/course.service';
import { Course } from '../../models/course';


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

}
