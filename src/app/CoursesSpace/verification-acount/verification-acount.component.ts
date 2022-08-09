import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserServicesService} from "../services/user-services.service";
import {interval, Observable} from "rxjs";
import {Timer} from "../services/timer";



@Component({
  selector: 'app-verification-acount',
  templateUrl: './verification-acount.component.html',
  styleUrls: ['./verification-acount.component.scss']
})
export class VerificationAcountComponent implements OnInit {
  public token: any;
  interval$: any;

  counter = 30;
  currentTime: Timer;
  isLoading = true;
  email: string;
  form: any = {};

  constructor( private auth : UserServicesService, private route:ActivatedRoute,private snackbar:MatSnackBar) { }

  ngOnInit(): void {

    this.token = this.route.snapshot.params['token'];

    this.setTimer().subscribe(res => {
      this.isLoading = false;
      this.currentTime = res;
    }, (err) => {
      this.snackbar.open(' Resend email verification ', 'Undo', {
        duration: 2000
      });
    });
  }


  activationAccount()
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


  ReactivationAccount()
  {
    this.auth.resendToken(this.form.email).subscribe( () => {
      console.log(this.email);

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


  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {

          this.counter = 30;

        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 300000);
  }


  private setTimer(): Observable<Timer> {
    return new Observable<Timer>((obs) => {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const twentyMinutesLater = new Date();
      twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 1);
      const timer = twentyMinutesLater.getTime();
      setInterval(() => {
        const now = new Date().getTime();
        const distance = timer - now;
        const currentTime: Timer = {
          day: Math.floor(distance / day),
          hour: Math.floor((distance % day) / hour),
          minute: Math.floor((distance % hour) / minute),
          second: Math.floor((distance % minute) / second)
        };

        if (
          currentTime.day    === 0 &&
          currentTime.hour   === 0 &&
          currentTime.minute === 0 &&
          currentTime.second === 0
        ) {

          obs.next(currentTime);

          obs.complete();


        } else {
          obs.next(currentTime);
        }
      }, second);
    });
  }


}
