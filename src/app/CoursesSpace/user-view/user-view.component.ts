import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../core/model/User";
import {FormationService} from "../services/formation.service";
import {Formation} from "../../core/model/Formation";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  public imagePath :File;
  imgURL: any;
  public idUser: any;
  public user :User;
  public listFomateur: User[];
  public formateur: Record<string, any>[];

  @Input() fr:Formation=new Formation;

  constructor(private serviceForm : FormationService, private route:ActivatedRoute,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['idUser'];
    this.serviceForm.getFormateur().subscribe((data:User[]) =>{ this.listFomateur = data;
      for (let u of this.listFomateur)
      {
        if(u.id == this.idUser)
        {
          this.user = u;
        }
      }
    });



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

  addFormation()
  {

    const formData = new FormData();

    formData.append('image',this.imagePath);
    formData.append('title',this.fr.title)
    formData.append('domain',this.fr.domain)
    formData.append('level',this.fr.level)
    formData.append('start',this.fr.start.toString())
    formData.append('end',this.fr.end.toString())
    formData.append('nbrHours',this.fr.nbrHours.toString())
    formData.append('lieu',this.fr.lieu);
    formData.append('nbrMaxParticipant',this.fr.nbrMaxParticipant.toString());
    formData.append('costs',this.fr.costs.toString());


    this.serviceForm.addFormation(formData,this.idUser).subscribe(
      data=>{
        console.log(data);
      });

    this.snackbar.open(' ajout avec succees', 'Undo', {
      duration: 2000
    });


  }



  deleteFormateur()
  {
    this.serviceForm.deleteFormateur(this.idUser).subscribe(data => {
      console.log(data);

    });

    setTimeout( () => {
      window.location.href = '#/home/Formation-management/Courses';
    },500);
    }

  getFormateur()
  {
    this.serviceForm.getFormateur().subscribe(
      (data: User[]) => {this.formateur = data;
      });

  }

}
