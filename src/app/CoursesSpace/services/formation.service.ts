import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../../core/model/Formation";
import {User} from "../../core/model/User";
import {PostComment} from "../../core/model/PostComment";
import {Quiz} from "../../core/model/Quiz";
import {Rating} from "../../core/model/Rating";
import {Result} from "../../core/model/Result";
import {Certificate} from "../../core/model/Certificate";





export interface IPagedResponse {
  total: number;
  data: User[];
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpHeaders = {

}


@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http : HttpClient) { }

  public event :[];
  public formateur :[];

  public  field : {[key : string]:any};

  getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
  }


  login(credentials:any): Observable<any> {
    return this.http.post('http://localhost:4000/api/user/login', {
      email: credentials.username,
      password: credentials.password
    }, httpOptions);
  }


  register(filew: FormData): Observable<any> {


    return this.http.post('http://localhost:4000/api/user/register', filew);
  }


  getpourcentagesMonth(): Observable<any>
  {
    return  this.http.get<any>('http://localhost:8099/Courses/PourcentageCoursesByDomain');
  }



  getFormateur():Observable<User[]>
  {
    return this.http.get<User[]>('http://localhost:4000/api/user/getFormer',{headers : this.getHeaders()});
  }


  getFormateurRemunerationMaxSalaireTrie():Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8099/Courses/getFormateurMaxSalaireTrie');
  }


  getDataFormateur()
  {


    let xmll = new XMLHttpRequest();

    xmll.onreadystatechange = ()=>
    {
      this.event = JSON.parse(xmll.responseText)
    };


    xmll.open('get','http://localhost:8099/Courses/retrieveFormation',true);



    xmll.send(null);
    return this.event;

  }


  getDataFormation()
  {

    let xx = new XMLHttpRequest();
    xx.onreadystatechange = ()=>
    {
      this.formateur = JSON.parse(xx.responseText)
    };

    xx.open('get','http://localhost:8099/Courses/retrieveFormateur',true);


    xx.send(null);


    return this.formateur;

  }




  //////////////////// Formation ////////////////////////////////////////


  getCommentByFormation(idF : string): Observable<PostComment[]>
  {
    return this.http.get<PostComment[]>('http://localhost:4000/api/comment/'+idF,{headers : this.getHeaders()});
  }


  listUserByCourses(idF : string): Observable<User[]>
  {
    return this.http.get<User[]>('http://localhost:4000/api/user/'+idF,{headers : this.getHeaders()});
  }

  getAllComment(): Observable<PostComment[]>
  {
    return this.http.get<PostComment[]>('http://localhost:8099/Courses/getAllComments');
  }


  writeComment(mess :PostComment,idF :string , idU : string): Observable<number>
  {
    return this.http.post<number>("http://localhost:4000/api/comment/"+idF+"/"+idU+"/",mess,{headers : this.getHeaders()})
  }


  addFormation(form: FormData,i:string): Observable<any>
  {

    return this.http.post<any>("http://localhost:4000/api/courses/"+i,form,{headers : this.getHeaders()})
  }

  SerachMultiple(key:string) :Observable<Formation[]>
  {
    return this.http.post<any>('http://localhost:4000/api/courses/searchSingleKey',{"key":key},{headers : this.getHeaders()});
  }

  getFormateurbyFormation(id : string):Observable<User>
  {
    return this.http.get<User>('http://localhost:8099/Courses/getFormateurFromFormation/'+id);
  }


  SerachRepi(key : string):Observable<any>
  {
    return this.http.post<any>('http://localhost:8099/Courses/SearchHistorique/'+key,1)
  }


  getFormationByFormateur(id:string):Observable<Formation[]> {
    return this.http.get<Formation[]>('http://localhost:8099/Courses/getFormationByFormateur/'+id);
  }

  getFormationByApprenant(id:string):Observable<any[]> {
    return this.http.get<any[]>('http://localhost:4000/api/courses/getMycourses/'+id,{headers : this.getHeaders()});
  }

  getListQuizByUser(id : string,idf : string):Observable<Quiz[]>
  {
    return this.http.get<Quiz[]>('http://localhost:4000/api/quiz/listQuiqtestedbuUser/'+id+"/"+idf,{headers : this.getHeaders()});
  }


/*
  getFormation():Observable<Formation[]>
  {
    return this.http.get<Formation[]>("http://localhost:8099/Courses/retrieveFormation");
  }

 */

  getFormation():Observable<Formation[]>
  {
    return this.http.get<Formation[]>("http://localhost:4000/api/courses");
  }


  getPourcentage():Observable<Object[]>
  {
    return this.http.get<Object[]>("http://localhost:8099/Courses/getPourcentage");
  }

  getAllSearch():Observable<Object[]>
  {
    return this.http.get<Object[]>("http://localhost:8099/Courses/getAllSearch");
  }

  getFormationById(id:string):Observable<Formation> {
    return this.http.get<Formation>("http://localhost:4000/api/courses/"+id,{headers : this.getHeaders()});
  }

  getApprenantByFormation(i : string):Observable<User[]> {
    return this.http.get<User[]>("http://localhost:4000/api/courses/getStudent/"+i);
  }



  deleteFormation(i:string): Observable<any> {

    return this.http.delete("http://localhost:4000/api/courses/"+i,{headers : this.getHeaders()})
  }

  deleteFormateur(i:string): Observable<any> {

    return this.http.get("http://localhost:8099/user/deleteUserById/"+i);
  }

  deleteFiles(i:string): Observable<any> {

    return this.http.get("http://localhost:8099/Courses/deleteFiles/"+i);
  }

  updateFormation(f:Formation,i:string): Observable<any>
  {
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(f);
    console.log(body);
    return this.http.put<Formation>
    ("http://localhost:8099/Courses/updateFormation/"+i,f);
  }

  affectationApptoFormation(idApp :string , idFor : string): Observable<any>
  {

    return this.http.post<any>("http://localhost:4000/api/courses/"+idFor+"/"+idApp,null,{headers : this.getHeaders()});

  }

  getRevenueByFormation(i :string):Observable<number>
  {
    return  this.http.get<number>('http://localhost:8099/Courses/getRevenueByFormation/'+i)
  }

  getVideo(path : string) : Observable<any>
  {
    return  this.http.get('http://localhost:4000/api/video/'+path,{headers : this.getHeaders()})
  }

  getNbrApprenantByFormation():Observable<Object[]>
  {

    return this.http
      .get<Object[]>("http://localhost:8099/Courses/NbrApprenantByFormation")
  }



  addLikes(i:string,id:string): Observable<any> {
    return this.http.post("http://localhost:4000/api/comment/like/"+i+"/"+id,null,{headers : this.getHeaders()})
  }

  addDisLikes(i:string,id:string): Observable<any> {

    return this.http.post("http://localhost:4000/api/comment/dislike/"+i+"/"+id,null,{headers : this.getHeaders()})
  }

  desaffecterApprenant(idU:string,idF:string): Observable<any> {

    return this.http.delete<any>("http://localhost:4000/api/user/desaffection/"+idU+"/"+idF,{headers : this.getHeaders()})
  }



  getNbrLikes(id:string):Observable<any>
  {
    return this.http.get<any>('http://localhost:8099/Courses/getNbrLikesByComment/'+id);
  }

  getNbrDisLikes(id:string):Observable<any>
  {
    return this.http.get<any>('http://localhost:8099/Courses/getNbrDislikesByComment/'+id);
  }

  addRatingFormation(idF:string,idU:string,rate :Rating):Observable<Rating>
  {
    return this.http.post<Rating>("http://localhost:4000/api/rating/"+idF+"/"+idU,rate,{headers : this.getHeaders()})
  }

  getRatingFormation(idF:string):Observable<number>
  {
    return this.http.get<number>("http://localhost:4000/api/rating/"+idF,{headers : this.getHeaders()})
  }



  uploadFile(file: FormData, i: string): Observable<any>
  {
    return this.http.post<any>('http://localhost:8099/Courses/uploadMultipleFiles/'+i,file);
  }

  getFile(file: string): Observable<any>
  {
    return this.http.get<any>('http://localhost:8099/Courses/get/'+file);
  }

  DownloadFile(file: string):Observable<Blob>
  {
    const body = {filename :file};
    return this.http.post('http://localhost:4000/api/downloadFile',body,{
      responseType:'blob',
      headers : new HttpHeaders().append('Content-Type','application/json')
    });
  }


  getFilesFormation( i: string): Observable<any>
  {
    return this.http.get<any>('http://localhost:8099/Courses/getFiles/'+i);
  }

  getCertifcateByCoursesAndUser( idC: string,idU : string): Observable<Certificate>
  {
    return this.http.get<Certificate>('http://localhost:4000/api/courses/'+idC+'/'+idU,{headers : this.getHeaders()});
  }





  exportPDF():Observable<Blob>
  {
    return this.http.get('http://localhost:8099/Courses/exportPDF',{responseType:'blob'} );
  }







}
