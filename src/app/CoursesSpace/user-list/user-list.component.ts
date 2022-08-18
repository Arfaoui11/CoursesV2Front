import { Component, OnInit } from '@angular/core';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "ngx-qrcode2";

import {MatSnackBar} from "@angular/material/snack-bar";
import {UserServicesService} from "../services/user-services.service";
import {Formation} from "../../core/model/Formation";
import {User} from "../../core/model/User";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  elementType= NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM;
  public listUsers: User[];
  page = 1;
  public Items: number;
  public type = 'All';
  public state = 'All';

  public user: User=new User();
  public verified: true;

  constructor(private serviceUser : UserServicesService,private snackbar:MatSnackBar) { }


  ngOnInit(): void {
    this.getUsers();

  }

  getUsers(){
    this.serviceUser.getAllUser().subscribe(
      (data:User[])=>{this.listUsers = data});

    return this.listUsers;
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getUsers();
  }


  SearchMultiple(key:string): void
  {
    if (key !== null)
    {
      this.user.lastName = key;
    }else {
      this.user.lastName = '';
    }
    this.user.state = this.state;
    this.user.type = this.type;

    this.serviceUser.Search(this.user).subscribe(
      (data:User[]) => {
        this.listUsers = data ;
        if (this.listUsers.length == 0 )
          this.snackbar.open(' Not Found', 'Undo', {
            duration: 2000
          });
      }
    )
  }


}
