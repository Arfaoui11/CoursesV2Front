import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

import {TokenService} from "../../CoursesSpace/services/token.service";
import {Formation} from "../../core/model/Formation";
import {FormationService} from "../../CoursesSpace/services/formation.service";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'app-home-f',
  templateUrl: './home-f.component.html',
  styleUrls: ['./home-f.component.scss']
})
export class HomeFComponent implements OnInit {

  currentUser: any = [];
  public img: any;
  public pressure: any;
  public wind: any;
  public desc: any;
  public humidite: any;
  public lieu: any;
  public drizzle: any;
  public lat: any;
  public lot: any;
  public index= 0;
  public category = '';




  public order : number = -1;

  public domain : string = "all";

  public formation: Formation = new Formation();

  @ViewChild('thenfirst', {static: true}) thenfirst: TemplateRef<any>|null = null;
  @ViewChild('thenSec', {static: true}) thenSec: TemplateRef<any>|null = null;

  constructor(private token: TokenService ,private serviceForm : FormationService,private snackbar:MatSnackBar ) {
    this.currentUser = this.token.getUser();
  }

  listFormation  : Formation[];
 public tableau = [{cle:'', valeur:0}];
  public cat = new Map();

 public temp : any;
 public choix: number=1;

  ngOnInit(): void {

    this.getAllFormation();


    fetch('https://api.openweathermap.org/data/2.5/weather?q=ariana&units=metric&appid=50a7aa80fa492fa92e874d23ad061374')
      .then(response => response.json())
      .then(data => {
        let tempValue = data['main']['temp'];
        let drizzle = data['weather'][0]['main'];

        let name = data['name'];
        let pressure = data['main']['pressure'];
        let humidity = data['main']['humidity'];
        let descValue = data['weather'][0]['description'];
        let wind = data['wind']['speed'];
        this.img = data['weather'][0]['icon'];
        let lat = data['coord']['lat'];
        let lot = data['coord']['lon'];

        this.lat = lat;
        this.lot = lot;

        this.drizzle = drizzle;
        this.lieu = name;
        this.wind = wind;
        this.pressure += pressure ;
        this.humidite = humidity;
        this.temp = tempValue.toFixed(1);

        this.desc = descValue;


      });


  }


  getAllFormation()
  {
    return  this.serviceForm.getFormation().subscribe(
      (data : Formation[]) => {this.listFormation = data;
        this.nbrCategory();
      });
  }

  nextCourses() {
    this.index++;

    if (this.index === this.listFormation.length) {
      this.index = 0;
    }
  }


  SearchMultiple(key:string): void
  {
    if (key=='') {
      this.getAllFormation()
    }
    else if (key!=null)
    {
      this.serviceForm.SingleKey(key).subscribe(
        (data:Formation[]) => {
          this.listFormation =data
        }
      );
    }

  }

  nbrCategory()
  {
  let c1=0;
    let c2=0;
    let c3=0;
    let c4=0;
    let c5=0;
    let c6=0;

    for (let l of this.listFormation)
    {

      if (l.domain.toString() === 'DEVELOPMENT')
      {
        c1++;
      }else if (l.domain.toString() === 'IT&SOFTWARE')
      {
        c2++;
      }else if (l.domain.toString() === 'TEACHING&ACADEMICS')
      {
        c3++;
      }else if (l.domain.toString() === 'LIFESTYLE')
      {
        c4++;
      }else if (l.domain.toString() === 'PHOTOGRAPHY&VIDEO')
      {
        c5++;
      }else if (l.domain.toString() === 'MUSIC')
      {
        c6++;
      }



    }

    this.tableau.push({cle: 'DEVELOPMENT',valeur: c1});
    this.tableau.push({cle: 'IT&SOFTWARE',valeur: c2});
    this.tableau.push({cle: 'TEACHING&ACADEMICS',valeur: c3});
    this.tableau.push({cle: 'LIFESTYLE',valeur: c4});
    this.tableau.push({cle: 'PHOTOGRAPHY&VIDEO',valeur: c5});
    this.tableau.push({cle: 'MUSIC',valeur: c6});




  }

  IndexLeft() {
    if (this.choix !== 1)
    {
      this.choix--;
    }
  }

  IndexRigth() {
    if (this.choix <= this.tableau.length)
    {
      this.choix++;
    }

  }
}
