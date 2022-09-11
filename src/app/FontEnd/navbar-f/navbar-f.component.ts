import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../CoursesSpace/services/token.service";
import {CartService} from "../../CoursesSpace/services/cart.service";
import {FormationService} from "../../CoursesSpace/services/formation.service";
import {Router} from "@angular/router";
import {GoogleApiService, UserInfo} from "../../CoursesSpace/services/google-api.service";
import {User} from "../../core/model/User";

@Component({
  selector: 'app-navbar-f',
  templateUrl: './navbar-f.component.html',
  styleUrls: ['./navbar-f.component.scss']
})
export class NavbarFComponent implements OnInit {

  public totalItem : number = 0;
  username: string;
  currentUser: any;
  public user: User = new User();
  public Items: number;






  constructor(private token: TokenService,private cartService : CartService,private router:Router,private serviceForm : FormationService) {
    this.currentUser = this.token.getUser();



  }
  ngOnInit(): void {

    this.cartService.getCourses()
      .subscribe(res=>{
        this.totalItem = res.length;
      });


    this.userDetails();



  }


  userDetails()
  {
    return  this.serviceForm.getUserById(this.currentUser.id).subscribe(
      (data : User) => {this.user = data;

      });
  }

  logout(): void {
    this.token.signOut();
    window.location.href = '/front/End/homeF';

  //  window.location.href = '/login';
  }

}
