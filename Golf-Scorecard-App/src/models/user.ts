import { Course } from './course';

export interface User {
  course: Course;
  teeType: number;
  players: Object[];
}
