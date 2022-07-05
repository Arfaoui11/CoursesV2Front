import {Likes} from "./likes";
import {DisLikes} from "./DisLikes";
import {User} from "./User";

export class PostComment {

  id!:number;
  message!:string;
  createAt!:Date;
  likes : Likes[];
  userC!:User;
}
