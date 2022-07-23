import {Formation} from "./Formation";
import {User} from "./User";

export class Rating {
  typeRating !: number;
  course !: Formation;
  user !: User;
}
