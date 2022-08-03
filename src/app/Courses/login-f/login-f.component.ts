import { Component, OnInit } from '@angular/core';
import {GoogleApiService, UserInfo} from "../../CoursesSpace/services/google-api.service";

@Component({
  selector: 'app-login-f',
  templateUrl: './login-f.component.html',
  styleUrls: ['./login-f.component.scss']
})
export class LoginFComponent implements OnInit {


  mailSnippets: string[] = [];
  userInfo?: UserInfo;

  constructor(private readonly googleApi: GoogleApiService) {
    googleApi.userProfileSubject.subscribe( info => {
      this.userInfo = info
    })
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

  logout() {
    this.googleApi.signOut()
  }

  async getEmails() {
    if (!this.userInfo) {
      return;
    }

    const userId = this.userInfo?.info.sub as string;

    setTimeout( () =>{ window.location.href = '/front/End/homeF';},500);
    console.log(userId)
  }

  ngOnInit(): void {
  }
}
