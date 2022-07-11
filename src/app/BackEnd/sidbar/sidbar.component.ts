import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../CoursesSpace/services/token.service";
import {AppdataService} from "../../CoursesSpace/services/appdata.service";

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css']
})
export class SidbarComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showStudentBoard = false;
  showFormerBoard = false;
  username: string;
  currentUser: any;

  constructor(private token: TokenService ,private appDataService: AppdataService) {

  }
  ngOnInit(): void {


    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.token.getUser();
    }
    this.showAdminBoard = this.roles.includes('ADMIN');
    this.showStudentBoard = this.roles.includes('STUDENT');
    this.showFormerBoard = this.roles.includes('FORMER');

    this.appDataService.id = this.currentUser.id;
    this.appDataService.lastName = this.currentUser.lastName;
    }


}
