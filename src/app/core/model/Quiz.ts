import {Result} from "./Result";


export class Quiz {

  id! : number;
  title !: string;
  score !: number;
  createAt !:Date;
  content !: string ;
  results:Result[]

}
