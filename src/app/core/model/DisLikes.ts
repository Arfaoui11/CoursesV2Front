import {User} from "./User";
import {PostComment} from "./PostComment";

export class DisLikes {

  id!:string;
  nbrDislikes!:number;
  createAt!:Date;
  user !: User;
  comment !: PostComment;

}
