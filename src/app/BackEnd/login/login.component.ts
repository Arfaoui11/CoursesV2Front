import { Component, OnInit } from '@angular/core';
import {FormationService} from "../../CoursesSpace/services/formation.service";

import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../../CoursesSpace/services/token.service";
import {UserServicesService} from "../../CoursesSpace/services/user-services.service";
import {User} from "../../core/model/User";
import {AppdataService} from "../../CoursesSpace/services/appdata.service";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {MatSnackBar} from "@angular/material/snack-bar";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private roles: string[];
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;

  showAdminBoard = false;
  showStudentBoard = false;
  showFormerBoard = false;
  public user: SocialUser;




  constructor(private authServiceGoogle: SocialAuthService,private appDataService: AppdataService,private authService: FormationService,private router:Router, private tokenStorage: TokenService, private route: ActivatedRoute, private userService: UserServicesService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {

   /* this.authServiceGoogle.authState.subscribe((user) => {
      this.user = user;
    })*/

    const token: string | null = this.route.snapshot.queryParamMap.get('token');
    const error: string | null = this.route.snapshot.queryParamMap.get('error');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
    else if(token){
      this.tokenStorage.saveToken(token);
      this.userService.getCurrentUser().subscribe(
        data => {
          this.login(data);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
    else if(error){
      this.errorMessage = error;
      this.isLoginFailed = true;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.login(data.user);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.snackbar.open(' please verify your account go to email we have link to activate you account', 'Undo', {
          duration: 2000
        });
      }
    );
  }

  login(user:User): void {
    this.tokenStorage.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorage.getUser();

    this.roles = this.currentUser.type;

    this.showAdminBoard = this.roles.includes('ADMIN');
    this.showStudentBoard = this.roles.includes('STUDENT');
    this.showFormerBoard = this.roles.includes('FORMER');

    this.appDataService.id = this.currentUser.id;
    this.appDataService.lastName = this.currentUser.lastName;

    if (this.showAdminBoard)
    {
       window.location.href = '/home/Formation-management/dashboard';
    }else if (this.showStudentBoard)
    {

      window.location.href = '/front/End/homeF';
    }else if (this.showFormerBoard){
      window.location.href = '/home/Formation-management/dashboard';
    }else {
      window.location.href = '#';
    }
  }


  signInHandler(): void {
    this.authServiceGoogle.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      console.log(data)
     // sessionStorage.setItem("google_auth", JSON.stringify(data))
     // localStorage.setItem('google_auth', JSON.stringify(data));
    //  this.router.navigateByUrl('/dashboardF').then();
    })
  }


}
