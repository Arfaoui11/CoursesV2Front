import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../../core/model/Formation";
import {User} from "../../core/model/User";
import {PostComment} from "../../core/model/PostComment";
import {Likes} from "../../core/model/likes";
import {DisLikes} from "../../core/model/DisLikes";
import {Quiz} from "../../core/model/Quiz";




export interface IPagedResponse {
  total: number;
  data: User[];
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http : HttpClient) { }

  public event :[];
  public formateur :[];

  public  field : {[key : string]:any};


  login(credentials:any): Observable<any> {
    return this.http.post('http://localhost:4000/api/user/login', {
      email: credentials.username,
      password: credentials.password
    }, httpOptions);
  }


  register(user:User): Observable<any> {
    return this.http.post('http://localhost:4000/api/user/register', {
      displayName: user.lastName,
      email: user.email,
      password: user.password,
      matchingPassword: user.password,
      phoneNumber : user.phoneNumber,
      tarifHoraire : user.tarifHoraire,
      profession : user.profession,
      age:user.age,
      isAdmin:user.isAdmin,
      socialProvider: 'LOCAL'
    }, httpOptions);
  }


  getpourcentagesMonth(): Observable<any>
  {
    return  this.http.get<any>('http://localhost:8099/Courses/PourcentageCoursesByDomain');
  }



  getFormateur():Observable<User[]>
  {
    return this.http.get<User[]>('http://localhost:8099/Courses/retrieveFormateur');
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
    return this.http.get<PostComment[]>('http://localhost:4000/api/comment/'+idF);
  }




  getAllComment(): Observable<PostComment[]>
  {
    return this.http.get<PostComment[]>('http://localhost:8099/Courses/getAllComments');
  }


  writeComment(mess :PostComment,idF :string , idU : string): Observable<number>
  {
    return this.http.post<number>("http://localhost:4000/api/comment/"+idF+"/"+idU+"/",mess)
  }


  addFormation(f : Formation,i:number): Observable<Formation>
  {
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(f);
    console.log(body);
    return this.http.post<Formation>("http://localhost:8099/Courses/ajouterEtAffecterFormationAFormateur/"+i,f)
  }

  SerachMultiple(key:string) :Observable<Formation[]>
  {
    return this.http.get<Formation[]>('http://localhost:8099/Courses/SearchMultiple/'+key);
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

  getFormationByApprenant(id:string):Observable<Formation[]> {
    return this.http.get<Formation[]>('http://localhost:8099/Courses/getFormationByApprenant/'+id);
  }

  getListQuizByUser(id : string,idf : string):Observable<any[]>
  {
    return this.http.get<any[]>('http://localhost:8099/Courses/listQuiqtestedbuUser/'+id+"/"+idf);
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
    return this.http.get<Formation>("http://localhost:4000/api/courses/"+id);
  }

  getApprenantByFormation(i : string):Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8099/Courses/ApprenantByFormation/"+i);
  }



  deleteFormation(i:string): Observable<any> {

    return this.http.get<number>("http://localhost:8099/Courses/deleteFormation/"+i)
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

    return this.http.post<any>("http://localhost:8099/Courses/affecterApprenantFormationWithMax/"+idApp+"/"+idFor,null);

  }

  getRevenueByFormation(i :string):Observable<number>
  {
    return  this.http.get<number>('http://localhost:8099/Courses/getRevenueByFormation/'+i)
  }

  getNbrApprenantByFormation():Observable<Object[]>
  {

    return this.http
      .get<Object[]>("http://localhost:8099/Courses/NbrApprenantByFormation")
  }

  addLikes(i:string,id:string): Observable<any> {
    return this.http.post<any>("http://localhost:4000/comment/like/"+i+"/"+id,null)
  }

  addDisLikes(i:string,id:string): Observable<any> {

    return this.http.post<any>("http://localhost:4000/comment/dislike/"+i+"/"+id,null)
  }

  desaffecterApprenant(idU:string,idF:string): Observable<any> {

    return this.http.post<any>("http://localhost:8099/Courses/desaffecterApprenant/"+idU+"/"+idF,null)
  }



  getNbrLikes(id:string):Observable<any>
  {
    return this.http.get<any>('http://localhost:8099/Courses/getNbrLikesByComment/'+id);
  }

  getNbrDisLikes(id:string):Observable<any>
  {
    return this.http.get<any>('http://localhost:8099/Courses/getNbrDislikesByComment/'+id);
  }

  addRatingFormation(idF:string,rate :number):Observable<any>
  {
    return this.http.put<any>("http://localhost:8099/Courses/FormationWIthRate/"+idF+"/"+rate,null)
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
    return this.http.get('http://localhost:8099/Courses/downloadFile/'+file,{responseType:'blob'});
  }


  getFilesFormation( i: string): Observable<any>
  {
    return this.http.get<any>('http://localhost:8099/Courses/getFiles/'+i);
  }





  exportPDF():Observable<Blob>
  {
    return this.http.get('http://localhost:8099/Courses/exportPDF',{responseType:'blob'} );
  }







}
