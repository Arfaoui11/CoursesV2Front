import {PostComment} from "./PostComment";
import {User} from "./User";

import {Quiz} from "./Quiz";

export class Formation {

  id!:number;
  title!:string;
  level!:string;
  start!:Date;
  end!:Date;
  nbrHeures!:number;
  image!:string;
  images!:string[];
  domain!:string;
  rating!:number;
  nbrMaxParticipant!:number;
  costs!:number;
  lieu!: string;
  formateur!:User;
  postComments!:PostComment[];
  apprenant!:User[];
  quizzes!:Quiz[];

}
