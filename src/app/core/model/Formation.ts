import {PostComment} from "./PostComment";
import {User} from "./User";

import {Quiz} from "./Quiz";
import {CourseApprenants} from "./courseApprenants";

export class Formation {

  id!:string;
  title!:string;
  level!:string;
  start!:Date;
  end!:Date;
  nbrHours!:number;
  image!:string;
  images!:string[];
  domain!:string;
  ratings!:number;
  nbrMaxParticipant!:number;
  costs!:number;
  lieu!: string;
  skills!: string;
  prerequisites !: string;
  userF!:User;
  comments!:PostComment[];
  courseApprenants!:CourseApprenants[];
  quizzes!:Quiz[];

}
