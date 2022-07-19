import {Component, Input, OnInit} from '@angular/core';
import {Formation} from "../../core/model/Formation";
import {FormationService} from "../services/formation.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChartType} from "angular-google-charts";
import {ShereService} from "../shared/shere.service";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "ngx-qrcode2";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  @Input() fr:Formation=new Formation;
  formation = new Formation();

  sowFormateur : boolean = false;

  listFomation : Formation[]=[];

  Image : any;

  key: any;




  idF : string;
  elementType= NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM;

  public imagePath :File;
  imgURL: any;

  type2 = ChartType.PieChart;
  title = 'Numbre Apprenant By Formation';
  type = ChartType.BubbleChart;
  typ3 = ChartType.BarChart;

  columnNames = ['Browser', 'Percentage'];
  options = {
  };
  width = 530;
  height = 350;


  data1:any;
  ArrayListT:any=[];

  name : string;
  public pourcentage: any;
  public SearchList: any[]=[];




  constructor(private sanitizer : DomSanitizer,private serviceForm : FormationService,private snackbar:MatSnackBar,private service : ShereService) {
   // this.getNbrApprenantByFormation();

  }

  ngOnInit(): void {
    console.log(this.idF);
    this.getformation();
   // this.getPourcentage();
   // this.getAllSearch();

   // this.getNbrApprenantByFormation();
  }

  getPourcentages()
  {
    this.serviceForm.getpourcentagesMonth().subscribe((data) => console.log(data));
  }


  ToggleForm()
  {
    this.getPourcentages();
    this.getNbrApprenantByFormation();
    this.getPourcentage();
    this.sowFormateur = ! this.sowFormateur;

  }

  getPourcentage()
  {
    this.serviceForm.getPourcentage().subscribe(data => this.pourcentage = data);
    return this.pourcentage;
  }


  getAllSearch()
  {
    this.serviceForm.getAllSearch().subscribe((data) =>
    {
      this.SearchList = data;
    });
  }


  dataId(i:string)
  {
    console.log(i);
    this.idF = i;
  }

  getformation(){
    this.serviceForm.getFormation().subscribe(
      (data:Formation[])=>{this.listFomation = data});

    return this.listFomation;
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
  addFormation(i:number)
  {
    const formData = new FormData();

    formData.append('image',this.imagePath);
    formData.append('title',this.fr.title)
    formData.append('domain',this.fr.domain)
    formData.append('level',this.fr.level)
    formData.append('start',this.fr.start.toDateString())
    formData.append('end',this.fr.end.toDateString())
    formData.append('nbrHours',this.fr.nbrHours.toString())
    formData.append('lieu',this.fr.lieu);
    formData.append('nbrMaxParticipant',this.fr.nbrMaxParticipant.toString());
    formData.append('costs',this.fr.costs.toString());


    this.serviceForm.addFormation(formData,'').subscribe(
      data=>{
        console.log(data);
        this.snackbar.open(' ajout avec succees', 'Undo', {
          duration: 2000
        });
      });

  }

  UpdateFormation(f: Formation,id : string)
  {

    this.serviceForm.updateFormation(f,id).subscribe(
      data=>{
        this.getformation();
      });

    this.snackbar.open(' Produit mis a jours avec succées', 'Undo', {
      duration: 2000
    });
  }

  deleteFormation(i :string)
  {
    this.serviceForm.deleteFormation(i)
      .subscribe(response => {

        this.listFomation = this.listFomation.filter(item => item.id !== i);
      });
    this.snackbar.open(' delete successfully', 'Undo', {
      duration: 2000
    });
  }

  UpdateTable(){
    this.serviceForm.getFormation().subscribe(data => {
      this.listFomation = data;

    });
    this.UpdateTable2();
  }
  UpdateTable2(){
    this.serviceForm.getFormation().subscribe(data => {
      this.listFomation = data;

    });
  }

  assignApprenent(idA : string , idF : string )
  {
    this.serviceForm.affectationApptoFormation(idA, idF).subscribe();
  }


  getRevenueByFormation(idFormation: string) {

    this.serviceForm.getRevenueByFormation(idFormation).subscribe(
      (data:number)=>{this.data1 = data});

    return this.data1;
  }

  list:any[]=[];
  values:any=[];
  array1:any=[];
  data3:any=[];
  data2:any = this.getNbrApprenantByFormation();







  getNbrApprenantByFormation()
  {
  //  this.data2=[];
   // this.list=[];
   // this.values=[];

    this.serviceForm.getNbrApprenantByFormation().subscribe
    ((data:Object[])=>{this.list = data});
    console.log(this.list);

    this.values = Array.from(this.list.values());
    for (let i=0;i<this.values.length;i++) {
      this.array1 = Array.from(this.values[i]);
      //this.array1.push(this.values[i].customer,this.values[i].number_of_orders)
      this.data3.push(this.array1);

      this.data2=this.data3;
      //console.log(this.data3)
    }

  }


  public SearchFormation(key: any): void {
    console.log(key);
    const results: any[] = [];
    for (const s of this.listFomation) {
      if (s.domain.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(s);
      }
    }
    this.listFomation = results;
    if ( !key) {
      this.getformation();
    }

  }

  getid()
  {
   return  this.service.getDate();
  }









  SearchMultiple(key:string): void
  {
    this.serviceForm.SerachMultiple(key).subscribe(
      (data:Formation[]) => {
        this.listFomation =data
      }
    )
  }


  SearchHistrique(key:string): void
  {
    this.serviceForm.SerachRepi(key).subscribe(data => {
      console.log(data)
      }
    )

  }

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

//Gets called when the user clicks on retieve image button to get the image from back end
  imageName: any;
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.serviceForm.getFilesFormation('aaasd')
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.data;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}
