import {Formation} from "./Formation";
import {Result} from "./Result";
import {Likes} from "./likes";
import {DisLikes} from "./DisLikes";
import {PostComment} from "./PostComment";

export class User {

  id !: number;
  displayName!:string;
  firstName ! : string;
  lastName ! : string;
  phoneNumber !:number;

  email !:string;
  tarifHoraire !:number;
  profession!:String;
  salary! : number;
  age!:number;
  state!:string;
  isAdmin!:boolean;
  password: any;
  matchingPassword: any;

  likes!:Likes[];
  dislikes!:DisLikes[];
  comments!:PostComment[];
  results!:Result[];
  coursesF!:Formation[];


  isOnline: Boolean;



}
