import { Component, OnInit } from '@angular/core';
import {FormationService} from "../../CoursesSpace/services/formation.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  private router: any;
  public imagePath :File;
  imgURL: any;

  constructor(private authService: FormationService,private http : HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    const formData = new FormData();

    formData.append('file',this.imagePath);
    formData.append('lastName',this.form.lastName)
    formData.append('firstName',this.form.firstName)
    formData.append('email',this.form.email)
    formData.append('password',this.form.password)
    formData.append('phoneNumber',this.form.phoneNumber)
    formData.append('age',this.form.age)


    this.authService.register(formData).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        if (this.isSuccessful)
        {
          window.location.href = '#/login';
        }
        this.isSignUpFailed = false;
      },

      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },

    );



  }



  selectImage(event : any) {


    const file : File = event?.target?.files[0];
    this.imagePath = file;

    const reader = new FileReader();



    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }



}
