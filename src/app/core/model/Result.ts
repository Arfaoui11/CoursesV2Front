import {Quiz} from "./Quiz";
import {User} from "./User";

export class Result {

  id:string;
  username : string;
  correctAnswer:number;
  inCorrectAnswer:number;
  totalCorrect : number;
  quiz:Quiz;
  user!:User;



}
