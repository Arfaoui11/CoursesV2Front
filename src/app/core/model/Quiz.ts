import {Result} from "./Result";


export class Quiz {

  id! : string;
  title !: string;
  score !: number;
  createdAt !:Date;
  content !: string ;
  results:Result[]

}
