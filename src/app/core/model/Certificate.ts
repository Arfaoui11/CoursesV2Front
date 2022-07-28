
import {User} from "./User";
import {Formation} from "./Formation";

export class Certificate {

  id!:string;
  name!:string;
  path!:string;

  user !: User;
  course !: Formation;
}
