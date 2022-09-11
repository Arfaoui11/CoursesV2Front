import {Formation} from "./Formation";
import {Result} from "./Result";
import {Likes} from "./likes";
import {DisLikes} from "./DisLikes";
import {PostComment} from "./PostComment";
import {CourseApprenants} from "./courseApprenants";

export class User {

  id !: string;
  firstName ! : string;
  lastName ! : string;
  phoneNumber !:number;
  email !:string;
  tarifHoraire !:number;
  profession!:String;
  salary! : number;
  country!:string;
  type!:string;
  age!:number;
  state!:string;
  verified!:boolean;
  file!:string;
  isAdmin!:boolean;
  password: any;
  matchingPassword: any;
  likes!:Likes[];
  dislikes!:DisLikes[];
  comments!:PostComment[];
  results!:Result[];
  coursesF!:Formation[];
  courseApprenants!:CourseApprenants[];
  isOnline: Boolean;


}
