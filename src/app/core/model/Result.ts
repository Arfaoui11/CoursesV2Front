import {Quiz} from "./Quiz";
import {User} from "./User";

export class Result {

  id:number;
  username : string;
  correctAnswer:number;
  inCorrectAnswer:number;
  totalCorrect : number;
  quiz:Quiz;
  suser!:User;



}
