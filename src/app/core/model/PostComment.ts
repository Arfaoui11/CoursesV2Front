import {Likes} from "./likes";
import {DisLikes} from "./DisLikes";
import {User} from "./User";
import {Formation} from "./Formation";

export class PostComment {

  id!:number;
  message!:string;
  createdAt!:Date;
  updatedAt!:Date;
  likes : Likes[];
  dislikes : DisLikes[];
  user!:User;
  course!:Formation;

}
