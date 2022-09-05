import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../CoursesSpace/services/token.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  isLoggedIn = false;

  username: string;
  currentUser: any;

  constructor(private token: TokenService) {
    this.currentUser = this.token.getUser();
  }
  ngOnInit(): void {



    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.token.getUser();
    }


  }
  logout(): void {
    this.token.signOut();
    //  window.location.reload();

    window.location.href = '/front/End/homeF';
  }
}
