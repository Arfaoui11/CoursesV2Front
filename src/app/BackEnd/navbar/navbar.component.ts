import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../CoursesSpace/services/token.service";
import {User} from "../../core/model/User";
import {FormationService} from "../../CoursesSpace/services/formation.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  public user: User = new User();

  username: string;
  currentUser: any;

  constructor(private token: TokenService,private serviceForm : FormationService) {
    this.currentUser = this.token.getUser();
  }
  ngOnInit(): void {

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
    //  window.location.reload();

    window.location.href = '/front/End/homeF';
  }
}
