import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserServicesService} from "../services/user-services.service";

@Component({
  selector: 'app-verification-acount',
  templateUrl: './verification-acount.component.html',
  styleUrls: ['./verification-acount.component.scss']
})
export class VerificationAcountComponent implements OnInit {
  public token: any;

  constructor( private auth : UserServicesService, private route:ActivatedRoute,private snackbar:MatSnackBar) { }

  ngOnInit(): void {

    this.token = this.route.snapshot.params['token'];
  }


  activationAcoount()
  {
    this.auth.activateAcoount(this.token).subscribe( () => {

        this.snackbar.open(' Account activated with success', 'Undo', {
          duration: 2000
        });
        window.location.href = '/login';
    },
      (error => {

        this.snackbar.open(' Something went wrong  !!!!', 'Undo', {
          duration: 2000
        });
      }))
  }


}
