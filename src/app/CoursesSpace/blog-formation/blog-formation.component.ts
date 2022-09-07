import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Formation} from "../../core/model/Formation";
import {User} from "../../core/model/User";
import {FormationService} from "../services/formation.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../services/token.service";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "ngx-qrcode2";
import {ChatServiceService} from "../services/chat-service.service";

@Component({
  selector: 'app-blog-formation',
  templateUrl: './blog-formation.component.html',
  styleUrls: ['./blog-formation.component.scss']
})
export class BlogFormationComponent implements OnInit {

  listFormation  : Formation[];
  toggle = true;

  public nbH : number = 2;
  public domain : string = "all";
  public level : string = "All";

  elementType= NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM;

  @ViewChild('thenfirst', {static: true}) thenfirst: TemplateRef<any>|null = null;
  @ViewChild('thenSec', {static: true}) thenSec: TemplateRef<any>|null = null;

  listApprenent : User[];
  sowFormateur : boolean = false;
  page = 1;
  public Items: number;
  public formation: Formation = new Formation();
  public order : number = -1;

  constructor(private chatService : ChatServiceService,private serviceForm : FormationService,private snackbar:MatSnackBar  ,private http: HttpClient, private route:ActivatedRoute,private token: TokenService) { }

  ngOnInit(): void {

    // Methode  subscribe recuperer la liste de donnee .
    this.getAllFormation();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getAllFormation();
  }


  templateForm(value: any) {
    alert(JSON.stringify(value.Level));
    this.level = JSON.stringify(value.Level);
  }



  getAllFormation()
  {
    return  this.serviceForm.getFormation().subscribe(
      (data : Formation[]) => {this.listFormation = data;
        this.Items = this.listFormation.length;
      });
  }


  ToggleForm()
  {
    this.sowFormateur = ! this.sowFormateur;
  }


  enableDisableRule() {
    this.toggle = !this.toggle;
  }


  affectationApptoFormation(idApp :string , idFor : string)
  {
    this.serviceForm.affectationApptoFormation(idApp, idFor).subscribe();
    this.snackbar.open(' ajout avec succees ', 'Back', {
      duration: 2000
    });
  }


  getApprenantByFormation(i : string)
  {
    this.serviceForm.getApprenantByFormation(i).subscribe(
      (data:User[])=>{this.listApprenent = data});
    return this.listApprenent;
  }






/*
  SearchMultiple(key:string): void
  {
    if (key=='') {
      this.getAllFormation()
    }
    else if (key!=null || this.formation != null)
    {
      this.serviceForm.SerachMultiple(this.formation).subscribe(
        (data:Formation[]) => {
          this.listFormation =data
        }
      );
    }

  }

 */

  SearchMultiple(key:string): void
  {
    if (key !== null)
    {
      this.formation.title = key;
    }else {
      this.formation.title = '';
    }

    this.formation.domain = this.domain;
    this.formation.level = this.level;
    this.formation.nbrHours = this.nbH;
    this.serviceForm.SerachMultiple(this.formation,this.order).subscribe(
      (data:Formation[]) => {
        this.listFormation =data;
        if (this.listFormation.length == 0 )
          this.snackbar.open(' Not Found', 'Undo', {
            duration: 2000
          });
      }
    )
  }


  SearchHistoric(value: any) {
    if (value=='') {
      this.getAllFormation()
    }
    else if (value!=null)
    {
      this.serviceForm.SerachRepi(value).subscribe(
        data => console.log(data)

      );
    }
  }
}
