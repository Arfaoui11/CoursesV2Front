import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../core/model/User";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  constructor(private http: HttpClient) { }

  getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
  }


  getPublicContent(): Observable<any> {
    return this.http.get('http://localhost:8099/api/all', { responseType: 'text' });
  }

  Search(user : User): Observable<any> {
    return this.http.post('http://localhost:4000/api/user/search', user,{headers : this.getHeaders()});
  }


  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4000/api/user',{headers : this.getHeaders()});
  }

  getUserBoard(): Observable<any> {
    return this.http.get('http://localhost:8099/api/user', { responseType: 'text' });
  }



  getAdminBoard(): Observable<any> {
    return this.http.get('http://localhost:8099/api/admin', { responseType: 'text' });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get('http://localhost:8099/api/user/me', httpOptions);
  }
}
