import { Injectable } from '@angular/core';
import {LocalStorage} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class AppdataService {

  @LocalStorage()
  public id: string;

  @LocalStorage()
  public displayName: string;

  public clearData(){
    this.id = '';
    this.displayName = "";
  }
}
