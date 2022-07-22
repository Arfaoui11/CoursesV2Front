import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../../core/model/Question";
import {Result} from "../../core/model/Result";
import {Quiz} from "../../core/model/Quiz";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http : HttpClient) { }

  getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
  }


  getQuestionJson(){
    return this.http.get<any>("assets/questions.json");
  }

  getQuizQuestion(id:string): Observable<Question[]>
  {
    return this.http.get<Question[]>("http://localhost:4000/api/quiz/getQuizQuestion/"+id,{headers : this.getHeaders()});
  }

  getQuestionByQuiz(id:string): Observable<Question[]>
  {
    return this.http.get<Question[]>("http://localhost:4000/api/quiz/getQuestionByQuiz/"+id,{headers : this.getHeaders()});
  }

  saveScore(re : Result,idU:string,idQ:string):Observable<Result>
  {
    return this.http.post<Result>('http://localhost:4000/api/quiz/SaveScore/'+idU+'/'+idQ,re,{headers : this.getHeaders()})
  }


  addQuiz(quiz : Quiz,idF:string):Observable<Quiz>
  {
    return this.http.post<Quiz>("http://localhost:4000/api/quiz/addQuiz/"+idF,quiz,{headers : this.getHeaders()});
  }

  addQuestion(qu : Question,idQuiz:string):Observable<Question>
  {
    return this.http.post<Question>("http://localhost:4000/api/quiz/addQuestionAndAsigntoQuiz/"+idQuiz,qu,{headers : this.getHeaders()});
  }

  getQuizByForm(id:string):Observable<Quiz[]>
  {
    return this.http.get<Quiz[]>('http://localhost:4000/api/quiz/getQuizByFormation/'+id,{headers : this.getHeaders()});
  }


  deleteQuiz(i:string): Observable<any> {

    return this.http.delete<number>("http://localhost:4000/api/quiz/DeleteQuiz/"+i,{headers : this.getHeaders()})
  }




    deleteQuestion(i:string): Observable<any> {

    return this.http.delete<number>(" http://localhost:4000/api/quiz/DeleteQuestion/"+i,{headers : this.getHeaders()})
  }

}
