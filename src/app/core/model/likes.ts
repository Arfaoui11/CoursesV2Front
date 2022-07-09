import {PostComment} from "./PostComment";
import {User} from "./User";

export class Likes {

  id!:string;
  nbrLikes!:number;
  createAt!:Date;

  user !: User;
  comment !: PostComment;
}
