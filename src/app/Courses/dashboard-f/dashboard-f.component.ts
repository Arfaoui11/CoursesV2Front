import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-f',
  templateUrl: './dashboard-f.component.html',
  styleUrls: ['./dashboard-f.component.scss']
})
export class DashboardFComponent implements OnInit {

  public userDetails: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth');

    if (storage) {
      this.userDetails = JSON.parse(storage);
    } else {
     // this.signOut();
    }
  }


  signOut(): void {
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('/login').then();
  }
}
