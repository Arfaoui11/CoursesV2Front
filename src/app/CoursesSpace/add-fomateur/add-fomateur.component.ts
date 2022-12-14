import {Component, Input, OnInit} from '@angular/core';
import {FormationService} from "../services/formation.service";
import {User} from "../../core/model/User";
import {Formation} from "../../core/model/Formation";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "ngx-qrcode2";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-fomateur',
  templateUrl: './add-fomateur.component.html',
  styleUrls: ['./add-fomateur.component.css']
})
export class AddFomateurComponent implements OnInit {

  listFomation : Formation[];
  @Input() fr:Formation=new Formation;
  idF : string;
  public imagePath :File;
  imgURL: any;

  elementType= NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM;
  formateur : User;


  show : boolean = false;

  constructor(private services : FormationService,private snackbar:MatSnackBar) {

    this.getformation()
  }

  ngOnInit(): void {
    this.formateur = new User();
  }


  getformation(){
    this.services.getFormation().subscribe(
      (data:Formation[])=>{this.listFomation = data});

    return this.listFomation;
  }

  dataId(i:string)
  {
    console.log(i);
    this.idF = i;
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



  UpdateFormation(f: Formation,id : string)
  {

    this.services.updateFormation(f,id).subscribe(
      data=>{
        this.getformation();
      });

  }

  ToggleForm()
  {
    this.show = ! this.show;
  }

  addFormation(i:string)
  {

    const formDataa = new FormData();

    formDataa.append('image',this.imagePath);
    formDataa.append('title',this.fr.title)
    formDataa.append('domain',this.fr.domain)
    formDataa.append('level',this.fr.level)
    formDataa.append('start',this.fr.start.toDateString())
    formDataa.append('end',this.fr.end.toDateString())
    formDataa.append('nbrHours',this.fr.nbrHours.toString())
    formDataa.append('lieu',this.fr.lieu);
    formDataa.append('nbrMaxParticipant',this.fr.nbrMaxParticipant.toString());
    formDataa.append('costs',this.fr.costs.toString());


    this.services.addFormation(formDataa,this.idF).subscribe(
      data=>{
        console.log(data);
        this.snackbar.open(' ajout avec succees', 'Undo', {
          duration: 2000
        });
      });








  }




  deleteFormation(i :string)
  {
    this.services.deleteFormation(i)
      .subscribe(response => {
        this.listFomation = this.listFomation.filter(item => item.id !== i);
      });
  }
  /*
  addFormateur()
  {
    this.services.addFormateur(this.formateur).subscribe(
      ()=> this.listFormateur = [this.formateur ,...this.listFormateur]
    );
  }

    UpdateFormation(value: any, idFormateur: number)
    {
      this.services.updateFormateur(this.formateur).subscribe(
        ()=> this.listFormateur = [this.formateur ,...this.listFormateur]
      );
    }

    deleteFormation(i :number)
    {
      this.services.deleteFormateur(i).subscribe(response => {
        this.listFormateur = this.listFormateur.filter(item => item.idFormateur !== i);
        this.UpdateTable();
      });
    }

    UpdateTable(){
      this.services.getFormateur().subscribe(data => {
        this.listFormateur = data;

      });
      this.UpdateTable2();
    }
    UpdateTable2(){
      this.services.getFormateur().subscribe(data => {
        this.listFormateur = data;

      });
    }
  */
  ExportPDF() {
    this.services.exportPDF().subscribe(
      x=>
      {
        const blob = new Blob([x],{type : 'application/pdf'})

        if(window.navigator && window.navigator.msSaveOrOpenBlob)
        {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }

        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'formation.pdf';
        link.dispatchEvent( new MouseEvent('click',{bubbles:true,cancelable:true,view:window}))

        setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
        },1000)

      }
    )

  }
}
