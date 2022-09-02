import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../CoursesSpace/services/token.service";
import {CartService} from "../../CoursesSpace/services/cart.service";
import {FormationService} from "../../CoursesSpace/services/formation.service";
import {Router} from "@angular/router";
import {GoogleApiService, UserInfo} from "../../CoursesSpace/services/google-api.service";

@Component({
  selector: 'app-navbar-f',
  templateUrl: './navbar-f.component.html',
  styleUrls: ['./navbar-f.component.scss']
})
export class NavbarFComponent implements OnInit {

  public totalItem : number = 0;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  currentUser: any;

  mailSnippets: string[] = [];
  userInfo?: UserInfo;




  constructor(private token: TokenService,private cartService : CartService,private router:Router) {
    this.currentUser = this.token.getUser();



  }
  ngOnInit(): void {

    this.cartService.getCourses()
      .subscribe(res=>{
        this.totalItem = res.length;
      });


    this.isLoggedIn = !!this.token.getToken();

    this.currentUser = this.token.getUser();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.displayName;
    }



  }

  logout(): void {
    this.token.signOut();
   window.location.reload();

   // window.location.href = '/login';
  }

}
